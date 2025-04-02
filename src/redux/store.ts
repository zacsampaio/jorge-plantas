import { Store } from "redux";
import { rootReducer } from "./rootReducer";
import { CartState } from "./cart/types";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { loadState, saveState } from "./localStorage";
import { AddressType } from "./address/types";

export type ApplicationState = {
  cart: CartState;
  address: AddressType
  paymentMethod: { paymentMethod: string | null };
};

const persistedState = loadState()

export const store: Store<ApplicationState> = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

store.subscribe(() => {
  saveState(store.getState());
})

