import React from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import weatherState, { TWeatherState } from "../State/WeatherState";
import { TOption } from "../../../Application/Types";

export const weatherSlice = createSlice({
  name: "weather",
  initialState: weatherState,
  reducers: {
    fetchWeather: (state, action: PayloadAction<TOption>) => {
      return state;
    },
    fetchWeatherSuccess: (state, action: PayloadAction<TWeatherState>) => {
      state.data = action.payload.data;
      state.success = action.payload.success;
    },
    fetchWeatherFailure: (state, action: PayloadAction<TWeatherState>) => {
      state.error = action.payload.error;
      state.success = action.payload.success;
    },
    clearWeather: () => {
      return weatherState;
    },
  },
});

export const {
  fetchWeather,
  fetchWeatherSuccess,
  fetchWeatherFailure,
  clearWeather,
} = weatherSlice.actions;

export default weatherSlice.reducer;
