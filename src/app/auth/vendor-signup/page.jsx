"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { vendorSignup } from "@/redux/slices/vendorSlice";
import { useDispatch } from "react-redux";

const VendorRegister = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    businessCategory: "",
    pan: "",
    gst: "",
    businessName: "",
    password: "",
    confirmPassword: "",
    gstDoc: null,
    bankDoc: null,
    addressProve: null,
  });
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  const router = useRouter();
const dispatch = useDispatch()
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://vrlqj94a70.execute-api.ap-south-1.amazonaws.com/api/admin/category/get-business-category"
        );
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    setErrors({});
  }, [formData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullname) newErrors.fullname = "Full Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }
    if (!formData.businessCategory)
      newErrors.businessCategory = "Business Category is required";
    if (!formData.pan) newErrors.pan = "PAN Number is required";
    if (!formData.gst) newErrors.gst = "GST Number is required";
    if (!formData.businessName)
      newErrors.businessName = "Business Name is required";
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.gstDoc) newErrors.gstDoc = "GST Document is required";
    if (!formData.bankDoc) newErrors.bankDoc = "Bank Document is required";
    if (!formData.addressProve)
      newErrors.addressProve = "Address Proof is required";
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
      console.log(formData);
    const resp =   dispatch(vendorSignup(formData));
console.log(resp);
      router.push("/vendor/dashboard");
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Registration failed");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const getPreviewUrl = (file) => {
    return file ? URL.createObjectURL(file) : null;
  };

  return (
    <div className="w-full min-h-screen frm flex justify-center items-center sm:px-6 px-3 py-10">
      <div className="form sm:p-8 p-4 sm:w-fit w-full rounded-md bg-white shadow-md border border-[#4e1b6112]">
        <h1 className="md:text-3xl text-2xl font-semibold text-[#4E1B61] sm:mb-0.5">
          Register as a Vendor
        </h1>
        <p className="sm:mb-3 mb-1.5 sm:text-base text-sm">
          Register your business on Indiestreet.
        </p>
        <form className="sm:mb-5 mb-2.5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 w-full sm:gap-3">
            <div className="element sm:mb-3 mb-1">
              <Label htmlFor="fullname" className=" sm:text-base text-xs">
                Full Name
              </Label>
              <Input
                type="text"
                name="fullname"
                placeholder="Full Name"
                className={`outline-none mt-0.5 rounded `}
                value={formData.fullname}
                onChange={handleInputChange}
              />
              {errors.fullname && (
                <p className="text-xs text-red-500">{errors.fullname}</p>
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
                className={`outline-none mt-0.5 rounded `}
                value={formData.email}
                onChange={handleInputChange}
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
                className={`outline-none mt-0.5 rounded `}
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
              {errors.phoneNumber && (
                <p className="text-xs text-red-500">{errors.phoneNumber}</p>
              )}
            </div>
            <div className="element sm:mb-3 mb-1">
              <Label
                htmlFor="businessCategory"
                className=" sm:text-base text-xs"
              >
                Business Category
              </Label>
              <select
                name="businessCategory"
                className={`flex h-10 border-2 border-[#4e1b613d] bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:border-[#4e1b617c] disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 ease-in-out duration-75 transition-all outline-none mt-0.5 rounded w-full`}
                value={formData.businessCategory}
                onChange={handleInputChange}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
              {errors.businessCategory && (
                <p className="text-xs text-red-500">
                  {errors.businessCategory}
                </p>
              )}
            </div>
            <div className="element sm:mb-3 mb-1">
              <Label htmlFor="pan" className=" sm:text-base text-xs">
                PAN Number
              </Label>
              <Input
                type="text"
                name="pan"
                placeholder="PAN Number"
                className={`outline-none mt-0.5 rounded `}
                value={formData.pan}
                onChange={handleInputChange}
              />
              {errors.pan && (
                <p className="text-xs text-red-500">{errors.pan}</p>
              )}
            </div>
            <div className="element sm:mb-3 mb-1">
              <Label htmlFor="gst" className=" sm:text-base text-xs">
                GST Number
              </Label>
              <Input
                type="text"
                name="gst"
                placeholder="GST Number"
                className={`outline-none mt-0.5 rounded `}
                value={formData.gst}
                onChange={handleInputChange}
              />
              {errors.gst && (
                <p className="text-xs text-red-500">{errors.gst}</p>
              )}
            </div>
            <div className="element sm:mb-3 mb-1">
              <Label htmlFor="businessName" className=" sm:text-base text-xs">
                Business Name
              </Label>
              <Input
                type="text"
                name="businessName"
                placeholder="Business Name"
                className={`outline-none mt-0.5 rounded `}
                value={formData.businessName}
                onChange={handleInputChange}
              />
              {errors.businessName && (
                <p className="text-xs text-red-500">{errors.businessName}</p>
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
                className={`outline-none mt-0.5 rounded `}
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password}</p>
              )}
            </div>
            <div className="element sm:mb-3 mb-1">
              <Label
                htmlFor="confirmPassword"
                className=" sm:text-base text-xs"
              >
                Confirm Password
              </Label>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className={`outline-none mt-0.5 rounded `}
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
          <div className="sm:mb-3 mb-1">
            <Label htmlFor="gstDoc" className=" sm:text-base text-xs">
              GST Document
            </Label>
            <Input
              type="file"
              name="gstDoc"
              className={`outline-none mt-0.5 rounded w-full`}
              onChange={handleFileChange}
            />
            {errors.gstDoc && (
              <p className="text-xs text-red-500">{errors.gstDoc}</p>
            )}
            {getPreviewUrl(formData.gstDoc) && (
              <img
                src={getPreviewUrl(formData.gstDoc)}
                alt="GST Document Preview"
                className="mt-2 w-full h-auto max-w-xs"
              />
            )}
          </div>
          <div className="sm:mb-3 mb-1">
            <Label htmlFor="bankDoc" className=" sm:text-base text-xs">
              Bank Document
            </Label>
            <Input
              type="file"
              name="bankDoc"
              className={`outline-none mt-0.5 rounded w-full`}
              onChange={handleFileChange}
            />
            {errors.bankDoc && (
              <p className="text-xs text-red-500">{errors.bankDoc}</p>
            )}
            {getPreviewUrl(formData.bankDoc) && (
              <img
                src={getPreviewUrl(formData.bankDoc)}
                alt="Bank Document Preview"
                className="mt-2 w-full h-auto max-w-xs"
              />
            )}
          </div>
          <div className="sm:mb-3 mb-1">
            <Label htmlFor="addressProve" className=" sm:text-base text-xs">
              Address Proof
            </Label>
            <Input
              type="file"
              name="addressProve"
              className={`outline-none mt-0.5 rounded w-full`}
              onChange={handleFileChange}
            />
            {errors.addressProve && (
              <p className="text-xs text-red-500">{errors.addressProve}</p>
            )}
            {getPreviewUrl(formData.addressProve) && (
              <img
                src={getPreviewUrl(formData.addressProve)}
                alt="Address Proof Preview"
                className="mt-2 w-full h-auto max-w-xs"
              />
            )}
          </div>
          <Button
            type="submit"
            className="w-full mt-3 bg-[#4E1B61] hover:bg-[#6d2d89]"
          >
            Register
          </Button>
        </form>
        <p className="text-sm">
          Already have an account?{" "}
          <Link href="/vendor/login" className="text-[#4E1B61]">
            Login
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VendorRegister;
