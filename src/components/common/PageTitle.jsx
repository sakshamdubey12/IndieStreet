/** @format */

import { cn } from "@/lib/utils";
import React from "react";

export default function PageTitle(props) {
  return <h1 className={cn("text-2xl font-semibold", props.className)}>{props.title}</h1>;
}
