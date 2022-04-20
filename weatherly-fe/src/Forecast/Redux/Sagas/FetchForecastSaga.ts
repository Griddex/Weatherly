import axios from "axios";
import {
  actionChannel,
  call,
  put,
  retry,
  select,
  takeLeading,
} from "redux-saga/effects";
import { post } from "../../../Application/Services/AuthService";
import baseUrl from "../../../Application/Services/BaseUrl";
import { RootState } from "../../../Application/Store";
import { TGenerator, TWatchGenerator } from "../../../Application/Types";
import {
  fetchForecastFailure,
  fetchForecastSuccess,
} from "../RTK/ForecastSlice";

export default function* watchFetchForecastSaga(): TWatchGenerator {
  const chan = yield actionChannel("forecast/fetchForecast");
  yield takeLeading(chan, fetchForecastSaga);
}

function* fetchForecastSaga(): TGenerator {
  const id = yield select(
    (state: RootState) => state.applicationReducer.selectedCityOption.id
  );

  const url = `${baseUrl}/forecast/?id=${id}`;

  const api = (url: string) => axios.get(url);
  const result = yield retry(3, 1000, api, url);
  // const result = yield call(api, url);
  const { success } = result.data;

  if (success) {
    yield put(fetchForecastSuccess(result.data));
  } else {
    yield put(fetchForecastFailure(result.data));
  }
}
