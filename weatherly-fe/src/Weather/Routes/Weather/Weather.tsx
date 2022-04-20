/**
 * Extensibility
 * Adopted vertical UI elements stacking pattern
 * Pattern allows future UI features to be added above, below or adjacent to any UI element.
 *
 */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SingleValue } from "react-select";
import { RootState } from "../../../Application/Store";
import { TOption } from "../../../Application/Types";
import SelectCity from "../../Components/SelectCity/SelectCity";
import { clearWeather, fetchWeather } from "../../Redux/RTK/WeatherSlice";
import CityData from "../../Data/CityData";
import { persistCityOption } from "../../../Application/Redux/ApplicationSlice";

const WeatherNow = React.lazy(
  () => import("../../Components/WeatherNow/WeatherNow")
);
const WeatherMore = React.lazy(
  () => import("../../Components/WeatherMore/WeatherMore")
);

const Weather = () => {
  const dispatch = useDispatch();

  /*
   Subscribe to success in weather redux store
   Get success when it is updated in store
  */
  const weatherSuccess = useSelector(
    (state: RootState) => state.weatherReducer.success
  );

  /*
   Memoize city data in a useRef
  */
  const cityOptionsRef = React.useRef([
    {
      id: 0,
      name: "Select",
      country: "Select",
      label: "Select City",
      value: "select",
    },
    ...(CityData.map((row) => ({
      ...row,
      label: row.name,
      value: row.name,
    })) as TOption[]),
  ]);

  /*
   Initialize city option with "Select City" value
  */
  const [selectedOption, setSelectedOption] = React.useState<TOption>(
    cityOptionsRef.current[0]
  );

  const isSelectCity = selectedOption.value === "select";

  const clearStore = () => {
    dispatch(clearWeather());
  };

  /*
   Define Selected city option
   Clear weather and forecast redux stores of stale data
   fetch weather data using selected option
   Clear weather and forecast redux stores if user selects "Select City"
  */
  const handleSelect = (option: SingleValue<TOption>) => {
    clearStore();

    const optionDef = option as TOption;
    setSelectedOption(optionDef);
    dispatch(persistCityOption(optionDef));

    if (optionDef.value !== "select") {
      dispatch(fetchWeather(optionDef));
    } else {
      clearStore();
    }
  };

  return (
    <div className="weather" data-testid="weather">
      <SelectCity
        selectedOption={selectedOption}
        options={cityOptionsRef.current}
        handleSelect={handleSelect}
      />
      {!isSelectCity && weatherSuccess && <WeatherNow />}
      {!isSelectCity && weatherSuccess && <WeatherMore />}
    </div>
  );

  // return <h1>Weather</h1>;
};

export default Weather;
