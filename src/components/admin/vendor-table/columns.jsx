"use client";
import { ArrowUpDown, CheckCircle2Icon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns = [
  {
    accessorKey: "fullname",
    header: ({ column }) => (
      <span
        className="text-black flex cursor-pointer text-left p-0 w-28"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Full Name
        <ArrowUpDown className="ml-1 h-4 w-4" />
      </span>
    ),
    cell: ({ row }) => (
      <div className="w-28 wrap-text">{row.original.fullname}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <span
        className="text-black flex items-center cursor-pointer text-left p-0 w-44"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="ml-1 h-4 w-4" />
      </span>
    ),
    cell: ({ row }) => (
      <div className="w-44 wrap-text">{row.original.email}</div>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <span
        className="text-black flex items-center cursor-pointer text-left p-0 w-20 h-10 text-wrap"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Phone Number
        <ArrowUpDown className="ml-1 h-5 w-5" />
      </span>
    ),
    cell: ({ row }) => (
      <div className="w-20 wrap-text">{row.original.phoneNumber}</div>
    ),
  },
  {
    accessorKey: "businessName",
    header: ({ column }) => (
      <span
        className="text-black flex items-center cursor-pointer text-left p-0 w-28"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Business Name
        <ArrowUpDown className="ml-1 h-4 w-4" />
      </span>
    ),
    cell: ({ row }) => (
      <div className="w-28 wrap-text">{row.original.businessName}</div>
    ),
  },
  {
    accessorKey: "businessCategory",
    header: ({ column }) => (
      <span
        className="text-black flex items-center cursor-pointer text-left p-0 w-24"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Business Category
        <ArrowUpDown className="ml-1 h-4 w-4" />
      </span>
    ),
    cell: ({ row }) => (
      <div className="w-24 wrap-text">{row.original.businessCategory}</div>
    ),
  },
  {
    accessorKey: "pan",
    header: ({ column }) => (
      <span
        className="text-black flex items-center cursor-pointer text-left p-0 w-20"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        PAN
        <ArrowUpDown className="ml-1 h-4 w-4" />
      </span>
    ),
    cell: ({ row }) => (
      <div className=" w-20 wrap-text">{row.original.pan}</div>
    ),
  },
  {
    accessorKey: "gst",
    header: ({ column }) => (
      <span
        className="text-black flex items-center cursor-pointer text-left p-0 w-24"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        GST
        <ArrowUpDown className="ml-1 h-4 w-4" />
      </span>
    ),
    cell: ({ row }) => (
      <div className=" w-24 wrap-text">{row.original.gst}</div>
    ),
  },
  {
    accessorKey: "documents",
    header: () => <p className="text-center">Documents</p>,
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger className=" py-2">Documents</DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <a href={row.original.accountProof}>Account Proof</a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href={row.original.addressProof}>Address Proof</a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href={row.original.gstProof}>GST Proof</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
  {
    accessorKey: "verifyVendor",
    header: () => <p className="w-16 text-center">Verify</p>,
    cell: ({ row }) => {
      console.log(row);
     return <div className="flex items-center justify-center w-16">
        <button className="p-2 text-[#4E1B61] rounded">
          <CheckCircle2Icon />
        </button>
      </div>
    },
  },
];
