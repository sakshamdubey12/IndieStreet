import { configureStore, getDefaultMiddleware, combineReducers } from "@reduxjs/toolkit";
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
import wishlistReducer from "./slices/wishlistSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from './slices/vendorSlice';
const applyMiddlewareConditionally = (middlewares) => {
  const isAuthEnabled = true;
  const isVendorApiEnabled = true;
  const isBusinessCategoryEnabled = true;
  const isProductCategoryEnabled = true;
  const isProductApiEnabled = true;
  const isGetProductApiEnabled = true;
  const isGetProductByIdApiEnabled = true;
  const isReviewsApiEnabled = true;

  if (isAuthEnabled) {
    middlewares.push(authSlice.middleware);
  }
  if (isVendorApiEnabled) {
    middlewares.push(VendorAPI.middleware);
  }
  if (isBusinessCategoryEnabled) {
    middlewares.push(BusinessCategory.middleware);
  }
  if (isProductCategoryEnabled) {
    middlewares.push(ProductCategory.middleware);
  }
  if (isProductApiEnabled) {
    middlewares.push(ProductAPI.middleware);
  }
  if (isGetProductApiEnabled) {
    middlewares.push(GetProductAPI.middleware);
  }
  if (isGetProductByIdApiEnabled) {
    middlewares.push(GetProductByIdAPI.middleware);
  }
  if (isReviewsApiEnabled) {
    middlewares.push(reviewsApi.middleware);
  }

  return middlewares;
};

const persistConfig = {
  key: "store",
  storage,
  whitelist: ["cart", "wishlist"],
  blacklist:['_persist']
};
const persistVendorConfig = {
  key: 'root',
  storage,
};
const rootReducer = combineReducers({
  dialog: dialogReducer,
  auth: persistReducer(persistVendorConfig, authReducer),
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
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    applyMiddlewareConditionally(
      getDefaultMiddleware({
        serializableCheck: false,
      })
    ),
});

export const persistor = persistStore(store);
