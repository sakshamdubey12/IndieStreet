"use client"
import { createSlice } from "@reduxjs/toolkit";

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.find(
        (product) => product.id === action.payload.id
      );
      if (!existingProduct) {
        state.push({ ...action.payload, quantity: 1 });
        saveCartToLocalStorage(state);
      }
    },
    removeFromCart: (state, action) => {
      const index = state.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.splice(index, 1);
      }
      saveCartToLocalStorage(state);
    },
    increaseQuantity: (state, action) => {
      const product = state.find((product) => product.id === action.payload.id);
      if (product) {
        product.quantity += 1;
      }
      saveCartToLocalStorage(state);
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
      saveCartToLocalStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
