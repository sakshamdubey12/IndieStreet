/** @format */

import { cn } from "@/lib/utils";
import React from "react";1

export default function StylishHeader({ title, className }) {
  return <h1 className={cn("lg:text-3xl md:text-2xl sm:text-xl text-lg font-medium lg:mb-8 md:mb-6 mb-4 uppercase tracking-wider text-[#CDF520] h-max w-full", className)}>{title}</h1>;
}
