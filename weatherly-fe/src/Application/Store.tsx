import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { spawn } from "redux-saga/effects";

function* rootSaga() {
  //   yield spawn(watchFetchWeatherSaga);
  //   yield spawn(watchFetchForecastSaga);
}
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {},
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export { store };
