import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const authSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/common/login',
        method: 'POST',
        body: credentials,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success === true) {
            const { token, ...userData } = data;
            localStorage.setItem("userData", JSON.stringify(userData));
            localStorage.setItem("isAuth", "true");
            Cookies.set("token", token, { expires: 7 });
          }
        } catch (error) {
          console.log("Login failed", error);
        }
      },
    }),
    registerUser: builder.mutation({
      query: (user) => ({
        url: '/user/auth/signup',
        method: 'POST',
        body: user,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success === true) {
            const { token, ...userData } = data;
            localStorage.setItem("userData", JSON.stringify(userData));
            localStorage.setItem("isAuth", "true");
            Cookies.set("token", token, { expires: 7 });
          }
        } catch (error) {
          console.log("Registration failed", error);
        }
      },
    }),
    registerVendor: builder.mutation({
      query: (vendor) => ({
        url: '/vendor/auth/register',
        method: 'POST',
        body: vendor,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success === true) {
            const { token, ...userData } = data;
            localStorage.setItem("userData", JSON.stringify(userData));
            localStorage.setItem("isAuth", "true");
            Cookies.set("token", token, { expires: 7 });
          }
        } catch (error) {
          console.log("Registration failed", error);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useRegisterVendorMutation,
} = authSlice;

export const logout = () => {
  localStorage.removeItem("userData");
  localStorage.setItem("isAuth", "false");
  Cookies.remove("token");
};
