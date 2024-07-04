import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const GetProductAPI = createApi({
  reducerPath: "getProductApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (builder) => ({
    getProductsByCategory: builder.query({
      query: () =>
        `/user/product/get-all-products`,
    }),
  }),
});

export const { useGetProductsByCategoryQuery } = GetProductAPI;
