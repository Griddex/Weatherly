import React from "react";
import isEqual from "react-fast-compare";
import { useDispatch, useSelector } from "react-redux";
import { createSelectorCreator, defaultMemoize } from "reselect";
import { RootState } from "../../Application/Store";
import { TBody } from "../../Application/Types";
import { fetchForecast } from "../Redux/RTK/ForecastSlice";

const Table = React.lazy(() => import("../Components/Table/Table"));
const Days = React.lazy(() => import("../Components/Days/Days"));

const deepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

const cityOptionSelector = deepEqualSelector(
  (state: RootState) => state.applicationReducer.selectedCityOption,
  (option) => option
);
const headersSelector = deepEqualSelector(
  (state: RootState) => state.forecastReducer.data.headers,
  (headers) => headers
);
const bodySelector = deepEqualSelector(
  (state: RootState) => state.forecastReducer.data.body,
  (body) => body
);
const daysSelector = deepEqualSelector(
  (state: RootState) => state.forecastReducer.data.days,
  (days) => days
);

const Forecast = () => {
  const dispatch = useDispatch();
  const weatherSuccess = useSelector(
    (state: RootState) => state.weatherReducer.success
  );
  const forecastSuccess = useSelector(
    (state: RootState) => state.forecastReducer.success
  );
  const cityOption = useSelector(cityOptionSelector);
  const headers: string[] = useSelector(headersSelector);
  const body: TBody = useSelector(bodySelector);
  const days: string[] = useSelector(daysSelector);

  /*
   Initial page render happens when city option is selected,
   hence firstDay, selectedDay and forecastTable are undefined
  */
  const firstDay = days[0];
  const [selectedDay, setSelectedDay] = React.useState(firstDay);
  const [forecastTable, setForecastTable] = React.useState(body[firstDay]);
  const memSetSelectedDay = React.useCallback(setSelectedDay, []);

  /*
   Register what city is selected
  */
  const isSelectCity = cityOption.value === "select";

  /*
   UseEffect runs when forecast has been successfully retrieved  from the api
   Therefore, first forecast day is selected in "Days" component,
   forecast table renders with data tied to first day
   Subsequently, any selection of forecast day, sets forecast table
  */
  React.useEffect(() => {
    if (!selectedDay) {
      setSelectedDay(firstDay);
    }
    if (forecastSuccess && selectedDay) {
      const forecastWithSN = body[selectedDay].map((row, i) => ({
        sn: i + 1,
        ...row,
      }));
      setForecastTable(forecastWithSN);
    }
  }, [forecastSuccess, selectedDay]);

  /*
   Use city and successful retrieval of weather and forecast data
   to render or occlude components
  */
  return (
    <div className="forecast">
      {!isSelectCity && weatherSuccess && (
        <label
          htmlFor="button"
          className="lblForecast"
        >{`${cityOption.label}'s Weather Forecast`}</label>
      )}
      {!isSelectCity && weatherSuccess && (
        <button
          name="button"
          className="btnForecast"
          onClick={() => dispatch(fetchForecast())}
          disabled={forecastSuccess}
        >
          Show
        </button>
      )}
      {!isSelectCity && forecastSuccess && (
        <Table headers={["SN", ...headers]} body={forecastTable} />
      )}
      {!isSelectCity && forecastSuccess && (
        <Days
          days={days}
          selectedDay={selectedDay}
          setSelectedDay={memSetSelectedDay}
        />
      )}
    </div>
  );
};

export default Forecast;
