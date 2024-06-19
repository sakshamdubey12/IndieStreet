"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useLoginMutation } from "@/redux/slices/authSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";

const Login = () => {
  const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const validate = () => {
    const newErrors = {};
    if (!emailOrPhoneNumber) {
      newErrors.emailOrPhoneNumber = "Email or Phone Number is required";
    } else if (
      !/^\S+@\S+\.\S+$/.test(emailOrPhoneNumber) &&
      !/^\d{10}$/.test(emailOrPhoneNumber)
    ) {
      newErrors.emailOrPhoneNumber =
        "Please enter a valid email or phone number";
    }
    if (!password) {
      newErrors.password = "Password is required";
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
      const loginData = /^\S+@\S+\.\S+$/.test(emailOrPhoneNumber)
        ? { email: emailOrPhoneNumber, password }
        : { phoneNumber: emailOrPhoneNumber, password };
      const response = await login(loginData).unwrap();
      console.log(response.message);
      if (response.success === true) {
        const { token, ...userData } = response;
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("isAuth", "true");
        Cookies.set("token", token, { expires: 7 });
        const decode = jwt.decode(token);
        if (decode.role === "admin") {
          router.push("/admin");
        } else if (decode.role === "vendor") {
          router.push("/vendor");
        } else {
          router.push("/");
        }

        toast.success(response.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Login failed");
    }
  };

  return (
    <div className="w-full h-screen frm flex justify-center items-center sm:px-6 px-3">
      <div className="form sm:p-8 p-4 rounded-md bg-white 2xl:w-[500px] xl:w-1/3 lg:w-2/5 md:w-3/5 sm:w-2/3 w-full shadow-[0_0_40px_rgba(78,27,97,0.15)] border border-[#4e1b6112]">
        <h1 className="md:text-3xl text-2xl font-semibold text-[#4E1B61] sm:mb-0.5">
          Welcome back
        </h1>
        <p className="sm:mb-3 mb-1.5 sm:text-base text-sm">
          Login to Indiestreet.
        </p>
        <form className="sm:mb-5 mb-2.5" onSubmit={handleSubmit}>
          <div className="element sm:mb-3 mb-1">
            <Label
              htmlFor="emailOrPhoneNumber"
              className=" sm:text-base text-xs"
            >
              Email or Phone Number
            </Label>
            <Input
              type="text"
              name="emailOrPhoneNumber"
              placeholder="Email or Phone Number"
              className={`outline-none mt-0.5 rounded sm:text-base text-sm`}
              value={emailOrPhoneNumber}
              onChange={(e) => setEmailOrPhoneNumber(e.target.value)}
            />
            {errors.emailOrPhoneNumber && (
              <p className="text-xs text-red-500">
                {errors.emailOrPhoneNumber}
              </p>
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
            <Button
              type="submit"
              className="w-full py-3.5"
              variant="default"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </div>
        </form>
        <div className="add-account sm:text-sm text-xs">
          <p className="mb-1">
            Don't have an account?{" "}
            <Link href="/auth/user-signup" className="text-blue-600">
              Sign Up
            </Link>
          </p>
          <p className="text-blue-500">Forgot Password?</p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;