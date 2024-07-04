import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const BusinessCategory = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBusinessCategory: builder.query({
      query: () => ({
        url: '/admin/category/get-business-category',
        method: 'GET',
      }),
    }),
    addCategory: builder.mutation({
      query: (body) => ({
        url: '/admin/category/business-category',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/admin/category/delete-business-category/${categoryId}`,
        method: 'DELETE',
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ categoryId, categoryName }) => ({
        url: `/admin/category/update-business-category/${categoryId}`,
        method: 'PUT',
        body: { categoryName },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    markCategoryInactive: builder.mutation({
      query: (categoryId) => ({
        url: `/admin/category/inactive-business-category/${categoryId}`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useGetBusinessCategoryQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useMarkCategoryInactiveMutation,
} = BusinessCategory;
