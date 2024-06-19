"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useRouter } from "next/navigation";

const Signup = () => {

  return (
    <div className="w-full min-h-screen frm flex justify-center items-center">
      <div className="form p-8 rounded-md bg-white lg:w-1/3 sm:w-1/2 w-full shadow-[0_0_40px_rgba(78,27,97,0.15)] border border-[#4e1b6112]">
        <h1 className="text-3xl font-semibold text-[#4E1B61] mb-3">
          Signup as Indieuser
        </h1>
        <form className="mb-5" >
          <div className="element mb-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
  
              placeholder="example@outlook.com"
              className="outline-none mt-1"
            />
      
          </div>
          <div className="element mb-2">
            <Label htmlFor="number">Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
   
              placeholder="Phone Number"
              className="outline-none mt-1"
            />
          </div>
          <div className="element mb-2">
            <Label htmlFor="fullname">Name</Label>
            <Input
              type="text"
              name="fullname"

              placeholder="Full Name"
              className="outline-none mt-1"
            />
          </div>
          <div className="element mb-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
   
              placeholder="Password"
              className="outline-none mt-1"
            />
          </div>
          <div className="element mb-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              name="confirmPassword"

              placeholder="Confirm Password"
              className="outline-none mt-1"
            />
          </div>
          <div className="element mb-2">
            <Button
              className="w-full bg-[#4E1B61] py-3.5 hover:bg-[#4E1B61]"
              type="submit"
            >
      signup
            </Button>
            {/* {status === "failed" && <p className="text-xs text-red-500">{error}</p>} */}
          </div>
        </form>
        <div className="add-account text-sm">
          <p className=" mb-2">
            Already have an account?{" "}
            <Link href="/auth" className="text-blue-600">
              Login
            </Link>
          </p>
          <p>
            Want to register as vendor?{" "}
            <Link href="/auth/vendor-signup" className="text-blue-600">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
