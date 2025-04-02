
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaymentType } from "./types";


const initialState: PaymentType = {
  paymentMethod: null
}

const paymentMethodSlice = createSlice({
  name: "paymentMethod",
  initialState,
  reducers: {
    setPaymentMethod(state, action: PayloadAction<string>){
      state.paymentMethod = action.payload
    }
  }
})

export const { setPaymentMethod } = paymentMethodSlice.actions;
export default paymentMethodSlice.reducer;