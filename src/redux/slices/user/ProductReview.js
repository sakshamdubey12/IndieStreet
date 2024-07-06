import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const getToken = () => {
  const token = Cookies.get("token");
  if (token) {
    const decode = jwt.decode(token);
    return { token, userId: decode.userId };
  } else {
    return { token: null, userId: null };
  }
};

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      const { token } = getToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        headers.set("Cookie", `token=${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    postReview: builder.mutation({
      query: ({ reviewData }) => {
        console.log(reviewData);
        const { userId } = getToken();
        return {
          url: `/user/review/post-review`,
          method: "POST",
          body: reviewData,
        };
      },
    }),
  }),
});

export const { usePostReviewMutation } = reviewsApi;
