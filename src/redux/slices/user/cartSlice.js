"use client";
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.find(
        (product) => product.id === action.payload.id
      );
      if (!existingProduct) {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const index = state.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    increaseQuantity: (state, action) => {
      const product = state.find((product) => product.id === action.payload.id);
      if (product) {
        product.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const product = state.find((product) => product.id === action.payload.id);
      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          const index = state.findIndex(
            (product) => product.id === action.payload.id
          );
          if (index !== -1) {
            state.splice(index, 1);
          }
        }
      }
    },
    clearCart: (state) => {
      return [];
    },
    removeItem: (state, action) => {
      const index = state.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  removeItem,
} = cartSlice.actions;
export default cartSlice.reducer;
