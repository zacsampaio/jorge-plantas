import { createSlice } from "@reduxjs/toolkit";
import { CartState } from "./types";

const initialState: CartState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increaseProduct: (state, action) => {
      const productIsAlreadyInCart  = state.products.find((product) => product.id === action.payload.id);

      if (productIsAlreadyInCart ) {
        productIsAlreadyInCart .quantity += 1;        
      }else{
        state.products.push({...action.payload, quantity: 1})
      }
    },
    decreaseProduct: (state, action) => {
      const product = state.products.find((product) => product.id === action.payload.id);

      if (product && product.quantity >1 ){
        product.quantity -= 1;
      } else {
        state.products = state.products.filter((product) => product.id !== action.payload.id)
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload.id)
    },
    clearCart: (state) => {
      state.products = []
    }
  }
});

export const { increaseProduct, decreaseProduct, removeProduct, clearCart  } = cartSlice.actions;

export default cartSlice.reducer;