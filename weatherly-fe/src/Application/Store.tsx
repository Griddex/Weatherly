import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { spawn } from "redux-saga/effects";
import watchFetchWeatherSaga from "../Weather/Redux/Sagas/FetchWeatherSaga";
import weatherReducer from "../Weather/Redux/RTK/WeatherSlice";
import applicationReducer from "./Redux/ApplicationSlice";
import forecastReducer from "../Forecast/Redux/RTK/ForecastSlice";

function* rootSaga() {
  yield spawn(watchFetchWeatherSaga);
}
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { applicationReducer, weatherReducer, forecastReducer },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export { store };
