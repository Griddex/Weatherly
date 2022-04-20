import React from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import forecastState from "../State/ForecastState";

type TForecastState = typeof forecastState;

export const FETCH_FORECAST = "FETCH_FORECAST";

export const forecastSlice = createSlice({
  name: "forecast",
  initialState: forecastState,
  reducers: {
    fetchForecast: () => {},
    fetchForecastSuccess: (state, action: PayloadAction<TForecastState>) => {
      state.data = action.payload.data;
      state.success = action.payload.success;
    },
    fetchForecastFailure: (state, action: PayloadAction<TForecastState>) => {
      state.error = action.payload.error;
      state.success = action.payload.success;
    },
    clearForecast: () => {
      return forecastState;
    },
  },
});

export const {
  fetchForecast,
  fetchForecastSuccess,
  fetchForecastFailure,
  clearForecast,
} = forecastSlice.actions;

export default forecastSlice.reducer;
