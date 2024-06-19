import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const getToken = () => {
  const token = Cookies.get('token');
  return token;
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const ProductCategory = createApi({
  reducerPath: 'productCategoryApi',
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
    getProductCategory: builder.query({
      query: () => ({
        url: '/admin/category/get-product-category',
        method: 'GET',
      }),
    }),
    addProductCategory: builder.mutation({
      query: (body) => ({
        url: '/admin/category/product-category',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    deleteProductCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/admin/category/delete-product-category/${categoryId}`,
        method: 'DELETE',
      }),
    }),
    updateProductCategory: builder.mutation({
      query: ({ categoryId, categoryName }) => ({
        url: `/admin/category/update-product-category/${categoryId}`,
        method: 'PUT',
        body: { categoryName },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    markProductCategoryInactive: builder.mutation({
      query: (categoryId) => ({
        url: `/admin/category/inactive-product-category/${categoryId}`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useGetProductCategoryQuery,
  useAddProductCategoryMutation,
  useDeleteProductCategoryMutation,
  useUpdateProductCategoryMutation,
  useMarkProductCategoryInactiveMutation,
} = ProductCategory;
