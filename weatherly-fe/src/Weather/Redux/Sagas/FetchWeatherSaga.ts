import axios from "axios";
import {
  actionChannel,
  call,
  put,
  retry,
  takeLeading,
} from "redux-saga/effects";
import baseUrl from "../../../Application/Services/BaseUrl";
import { TGenerator, TWatchGenerator } from "../../../Application/Types";
import { fetchWeatherFailure, fetchWeatherSuccess } from "../RTK/WeatherSlice";

export default function* watchFetchWeatherSaga(): TWatchGenerator {
  const chan = yield actionChannel("weather/fetchWeather");
  yield takeLeading(chan, fetchWeatherSaga);
}

function* fetchWeatherSaga(action: any): TGenerator {
  const url = `${baseUrl}/weather/?id=${action.payload.id}`;

  const api = (url: string) => axios.get(url);
  const result = yield retry(3, 1000, api, url);
  // const result = yield call(api, url);

  const { success } = result.data;

  if (success) {
    yield put(fetchWeatherSuccess(result.data));
  } else {
    yield put(fetchWeatherFailure(result.data));
  }
}
