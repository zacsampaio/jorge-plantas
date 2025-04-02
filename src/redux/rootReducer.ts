import { combineReducers } from "redux";
import cartReducer from "./cart/slice";
import addressReducer from "./address/slice"
import paymentMethodReducer from "./paymentMethod/slice"; 


export const rootReducer = combineReducers({
  cart: cartReducer,
  address: addressReducer,
  paymentMethod: paymentMethodReducer,
 });

export type RootState = ReturnType<typeof rootReducer>;
