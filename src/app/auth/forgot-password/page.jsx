"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const ForgotPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const { toast } = useToast();
  const [toggle, setToggle] = useState("number");

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    if (!/^\d+$/.test(value) && (value < 6000000000 || value > 9999999999)) {
      setPhoneNumber("");
    } else {
      setPhoneNumber(value);
    }
  };

  const handlePhoneNumberSubmit = (e) => {
    e.preventDefault();
    if (phoneError) {
      alert("Please correct the phone number.");
    } else if (phoneNumber.length == 10 && phoneNumber != "") {
      console.log(phoneNumber);
      setPhoneNumber("");
      setToggle("otp");
    } else {
      toast({
        variant: "destructive",
        description: "Phone Number required",
      });
    }
  };

  return (
    <div className="w-full h-screen frm flex justify-center items-center sm:px-6 px-3">
      <div className="form sm:p-8 p-4 rounded-md bg-white 2xl:w-[500px] xl:w-1/3 lg:w-2/5 md:w-3/5 sm:w-2/3 w-full shadow-[0_0_40px_rgba(78,27,97,0.15)] border border-[#4e1b6112]">
        <h1 className="md:text-3xl text-2xl font-semibold text-[#4E1B61] sm:mb-3">
          Forgot Password
        </h1>
        {toggle === "number" ? (
          <>
            <form onSubmit={handlePhoneNumberSubmit}>
              <Label htmlFor="number">
                Enter phone number to change password
              </Label>
              <Input
                name="number"
                className="mb-2"
                minLength={10}
                maxLength={10}
                value={phoneNumber}
                onChange={(e) => handlePhoneNumberChange(e.target.value)}
                placeholder="Phone Number"
              />
              {phoneError && (
                <p className="text-red-500 text-sm mb-2">{phoneError}</p>
              )}
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
            <Link href="/auth">Back to login</Link>
          </>
        ) : toggle === "otp" ? (
          <>
            <form>
              <Label htmlFor="otp">
                OTP has been sent to the entered phone number
              </Label>
              <InputOTP
                name="otp"
                maxLength={4}
                pattern={REGEXP_ONLY_DIGITS}
                className="mb-2"
              >
                <InputOTPGroup>
                  <InputOTPSlot
                    className="border-2 border-[#4e1b613d]"
                    index={0}
                  />
                  <InputOTPSlot
                    className="border-2 border-l-0 border-[#4e1b613d]"
                    index={1}
                  />
                  <InputOTPSlot
                    className="border-2 border-l-0 border-[#4e1b613d]"
                    index={2}
                  />
                  <InputOTPSlot
                    className="border-2 border-l-0 border-[#4e1b613d]"
                    index={3}
                  />
                </InputOTPGroup>
              </InputOTP>
              <Button className="w-full">Submit</Button>
            </form>
          </>
        ) : (
          <>
            <form>
              <div className="element sm:mb-3 mb-1">
                <Label htmlFor="password" className=" sm:text-base text-xs">
                  Password
                </Label>
                <div className="pass flex relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className={`outline-none mt-0.5 sm:text-base text-sm`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    onClick={handleTogglePasswordVisibility}
                    className="bg-white hover:bg-white text-black hover:text-black border-0 hover:border-0 absolute grid place-items-center right-1 top-1 h-9"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-[20px] h-[20px] absolute" />
                    ) : (
                      <EyeIcon className="w-[20px] h-[20px] absolute" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="element sm:mb-3 mb-1">
                <Label
                  htmlFor="confirmPassword"
                  className=" sm:text-base text-xs"
                >
                  Confirm Password
                </Label>
                <div className="pass flex relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className={`outline-none mt-0.5 sm:text-base text-sm`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    onClick={handleToggleConfirmPasswordVisibility}
                    className="bg-white hover:bg-white text-black hover:text-black border-0 hover:border-0 absolute grid place-items-center right-1 top-1 h-9"
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="w-[20px] h-[20px] absolute" />
                    ) : (
                      <EyeIcon className="w-[20px] h-[20px] absolute" />
                    )}
                  </Button>
                </div>
              </div>
              <Button className="w-full">Submit</Button>
            </form>
          </>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default ForgotPassword;
