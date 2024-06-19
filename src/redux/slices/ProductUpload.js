import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const getToken = () => {
  const token = Cookies.get("token");
  return token;
};

export const ProductAPI = createApi({
  reducerPath: "productApi",
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
    uploadProduct: builder.mutation({
      query: (productData) => (
        {
        url: "/vendor/product/upload-product",
        method: "POST",
        body: productData,
      }),
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: "/vendor/product/get-all-product",
        method: "GET",
      }),
    }),
  }),
});

export const { useUploadProductMutation, useGetAllProductsQuery } = ProductAPI;
