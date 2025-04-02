import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddressType } from "./types";

const initialState: AddressType = {
  zipCode: '',
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: '',
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<AddressType>) => {
      return { ...state, ...action.payload };
    },
  }
});

export const { setAddress } = addressSlice.actions;
export default addressSlice.reducer;