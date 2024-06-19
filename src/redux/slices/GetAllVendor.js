import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const getToken = () => {
  const token = Cookies.get("token");
  return token;
};

export const VendorAPI = createApi({
  reducerPath: "vendorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getVendorDetails: builder.query({
      query: () => "/admin/vendor/vendors-details",
    }),
    verifyVendor: builder.mutation({
      query: (vendorID) => ({
        url: `/admin/vendor/verify-vendor/${vendorID}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const { useGetVendorDetailsQuery, useVerifyVendorMutation } = VendorAPI;
