"use client";
import React, { useEffect, useState } from "react";
import { useGetVendorDetailsQuery } from "@/redux/slices/GetAllVendor";
import { columns } from "./vendor-table/columns";
import { DataTable } from "./vendor-table/data-table";
import { transformData } from "./vendor-table/transformData";

const Vendor = () => {
  const { data, error } = useGetVendorDetailsQuery();

  const [vendorDetailsFetched, setVendorDetailsFetched] = useState([]);
  useEffect(() => {
    if (data) {
      setVendorDetailsFetched(data.data);
    }
  }, [data]);
  // console.log(vendorDetailsFetched);
  const transformedData = transformData(vendorDetailsFetched);
  // console.log(transformedData);
  if (error) {
    return <>Can't get Vendors. Please refresh!</>;
  }
  return (
    <div className="">
      <DataTable columns={columns} data={transformedData} />
    </div>
  );
};

export default Vendor;
