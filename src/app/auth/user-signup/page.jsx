"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useRegisterUserMutation } from "@/redux/slices/authSlice";

const UserRegister = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const router = useRouter();

  useEffect(() => {
    setErrors({});
  }, [fullName, email, phoneNumber, password, confirmPassword]);

  const validate = () => {
    const newErrors = {};
    if (!fullName) newErrors.fullName = "Full Name is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const userData = { fullname: fullName, email, phoneNumber, password };
      const response = await registerUser(userData).unwrap();
      console.log(response);
      toast.success(response.message);
      Cookies.set("token", response.token, { expires: 7 });
      router.push("/");
    } catch (err) {
      console.log(err);
      toast.error(err.data.message || "Registration failed");
    }
  };

  return (
    <div className="w-full h-screen frm flex justify-center items-center sm:px-6 px-3">
      <div className="form sm:p-8 p-4 rounded-md bg-white 2xl:w-[500px] xl:w-1/3 lg:w-2/5 md:w-3/5 sm:w-2/3 w-full shadow-[0_0_40px_rgba(78,27,97,0.15)] border border-[#4e1b6112]">
        <h1 className="md:text-3xl text-2xl font-semibold text-[#4E1B61] sm:mb-0.5">
          Create an account
        </h1>
        <p className="sm:mb-3 mb-1.5 sm:text-base text-sm">
          Register on Indiestreet.
        </p>
        <form className="sm:mb-5 mb-2.5" onSubmit={handleSubmit}>
          <div className="element sm:mb-3 mb-1">
            <Label htmlFor="fullName" className=" sm:text-base text-xs">
              Full Name
            </Label>
            <Input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className={`outline-none mt-0.5 rounded sm:text-base text-sm`}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullName && (
              <p className="text-xs text-red-500">{errors.fullName}</p>
            )}
          </div>
          <div className="element sm:mb-3 mb-1">
            <Label htmlFor="email" className=" sm:text-base text-xs">
              Email
            </Label>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              className={`outline-none mt-0.5 rounded sm:text-base text-sm `}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>
          <div className="element sm:mb-3 mb-1">
            <Label htmlFor="phoneNumber" className=" sm:text-base text-xs">
              Phone Number
            </Label>
            <Input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              className={`outline-none mt-0.5 rounded sm:text-base text-sm `}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {errors.phoneNumber && (
              <p className="text-xs text-red-500">{errors.phoneNumber}</p>
            )}
          </div>
          <div className="element sm:mb-3 mb-1">
            <Label htmlFor="password" className=" sm:text-base text-xs">
              Password
            </Label>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              className={`outline-none mt-0.5 sm:text-base text-sm`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}
          </div>
          <div className="element sm:mb-3 mb-1">
            <Label htmlFor="confirmPassword" className=" sm:text-base text-xs">
              Confirm Password
            </Label>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className={`outline-none mt-0.5 sm:text-base text-sm`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
          <div className="element sm:mb-3 mb-1">
            <Button
              type="submit"
              className="w-full py-3.5"
              variant="default"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Register"}
            </Button>
          </div>
        </form>
        <div className="add-account sm:text-sm text-xs">
          <p className="mb-1">
            Already have an account?{" "}
            <Link href="/auth" className="text-blue-600">
              Login
            </Link>
          </p>
          <p>
            Signup as Vendor
            <Link href="/auth/vendor-signup" className="text-blue-600 ml-2">
              Signup
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserRegister;
