// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { VendorAPI } from "./slices/GetAllVendor";
import { BusinessCategory } from "./slices/BusinessCategorySlice";
import { ProductCategory } from "./slices/ProductCategorySlice";
import { ProductAPI } from "./slices/ProductUpload";
import { GetProductAPI } from "./slices/GetAllProduct";
import { GetProductByIdAPI } from "./slices/GetSingleProduct";
import { reviewsApi } from "./slices/ProductReview";
import dialogReducer from "./slices/dialogSlice";
import sortReducer from "./slices/productFilterSortSlice";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice.js";

export const store = configureStore({
  reducer: {
    dialog : dialogReducer,
    sort: sortReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [VendorAPI.reducerPath]: VendorAPI.reducer,
    [BusinessCategory.reducerPath]: BusinessCategory.reducer,
    [ProductCategory.reducerPath]: ProductCategory.reducer,
    [ProductAPI.reducerPath]: ProductAPI.reducer,
    [GetProductAPI.reducerPath]: GetProductAPI.reducer,
    [GetProductByIdAPI.reducerPath]: GetProductByIdAPI.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authSlice.middleware,
      VendorAPI.middleware,
      BusinessCategory.middleware,
      ProductCategory.middleware,
      ProductAPI.middleware,
      GetProductAPI.middleware,
      GetProductByIdAPI.middleware,
      reviewsApi.middleware
    ),
});
