'use client'
import { createSlice } from "@reduxjs/toolkit";

const loadWishlistFromLocalStorage = () => {
  const savedWishlist = localStorage.getItem("wishlist");
  return savedWishlist ? JSON.parse(savedWishlist) : [];
};

const initialState = {
  items: loadWishlistFromLocalStorage(),
};

const saveWishlistToLocalStorage = (wishlist) => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const existingProduct = state.items.find(
        (product) => product.id === action.payload.id
      );
      if (!existingProduct) {
        state.items.push({ ...action.payload });
        saveWishlistToLocalStorage(state.items);
      }
    },
    removeFromWishlist: (state, action) => {
      console.log(state.items);
      const index = state.items.findIndex(
        (product) => product.id === action.payload.id
      );
      console.log(index);
      if (index !== -1) {
        state.items.splice(index, 1);
        console.log(state.items);
        saveWishlistToLocalStorage(state.items);
      }
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
