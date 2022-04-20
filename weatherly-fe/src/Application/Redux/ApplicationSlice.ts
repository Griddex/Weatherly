import React from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import applicationState from "./State";

type TApplicationState = typeof applicationState;

export const applicationSlice = createSlice({
  name: "application",
  initialState: applicationState,
  reducers: {
    persistCityOption: (
      state,
      action: PayloadAction<TApplicationState["selectedCityOption"]>
    ) => {
      state.selectedCityOption = action.payload;
    },
  },
});

export const { persistCityOption } = applicationSlice.actions;

export default applicationSlice.reducer;
