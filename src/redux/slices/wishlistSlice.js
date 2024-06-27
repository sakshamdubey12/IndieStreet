"use client";
import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    addToWishlist: (state, action) => {
      const existingProduct = state.find(
        (product) => product.id === action.payload.id
      );
      if (!existingProduct) {
        state.push({ ...action.payload });
      }
    },
    removeFromWishlist: (state, action) => {
      const index = state.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    clearWishlist: (state) => {
      return [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
