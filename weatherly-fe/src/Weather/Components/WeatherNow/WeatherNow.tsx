/**
 * Displays weather summary for current day
 */

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Application/Store";
import WeatherNowSVG from "./weather.svg";

const WeatherNow = () => {
  /*
   Subscribe to weather data slice in weather redux store
   Get weather data when it is updated in store
  */
  const weather = useSelector(
    (state: RootState) => state.weatherReducer.data.weather
  );

  /*
   Parse weather, title and desciption
  */
  const weatherDef = weather as Record<string, React.Key>[];
  const title = weatherDef[0].main;
  const description = weatherDef[0].description;

  return (
    <div className="weathernow" data-testid="weathernow">
      <img className="weatherImg" src={WeatherNowSVG} />
      <div className="titleDesc">
        <div className="title">{title}</div>
        <div className="desc">{description}</div>
      </div>
    </div>
  );
};

export default WeatherNow;
