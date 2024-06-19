/** @format */

import { cn } from "@/lib/utils";
import React from "react";

export default function Header({ title, className }) {
  return (
    <h1 className={cn("md:text-2xl sm:text-xl text-base font-medium pb-2", className)}>{title}</h1>
  );
}
