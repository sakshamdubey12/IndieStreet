import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API
export const GetProductByIdAPI = createApi({
  reducerPath: "getSingleProductApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (builder) => ({
    getProductsByID: builder.query({
      query: (ProductID) => `/user/product/get-product-by-id/${ProductID}`,
    }),
  }),
});

export const { useGetProductsByIDQuery } = GetProductByIdAPI;
