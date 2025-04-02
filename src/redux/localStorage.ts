import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import logger from "redux-logger";
import { ApplicationState } from "./store";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("appState");
    if (serializedState) {
      const parsedState = JSON.parse(serializedState);
      return {
        cart: {
          products: Array.isArray(parsedState.cart?.products)
            ? parsedState.cart.products
            : [],
        },
        paymentMethod: { 
          paymentMethod: parsedState.paymentMethod?.paymentMethod || null 
        },
        address: parsedState.address || {
          zipCode: '',
          street: '',
          number: '',
          complement: '',
          neighborhood: '',
          city: '',
          state: '',
        }
      };
    }
  } catch (err) {
    console.error("Could not load state", err);
  }
  return {
    cart: { products: [] },
    paymentMethod: { paymentMethod: null },
    address: {
      zipCode: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
    }
  };
};

export const saveState = (state: ApplicationState) => {
  try {
    const { cart, paymentMethod, address } = state;
    const serializedState = JSON.stringify({ cart, paymentMethod, address });
    localStorage.setItem("appState", serializedState);
  } catch (err) {
    console.error("Error saving state to localStorage", err);
  }
};

const persistedState = loadState();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

store.subscribe(() => {
  saveState(store.getState());
})
