/**
 * Displays weather cards for pressure, humidity and speed
 */

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Application/Store";
import BasicWidget from "../BasicWidget/BasicWidget";
import WeatherCard from "../WeatherCard/WeatherCard";
import tempSVG from "./Images/temperature.svg";
import pressureSVG from "./Images/pressure.svg";
import humiditySVG from "./Images/humidity.svg";
import winddirectionSVG from "./Images/winddirection.svg";
import MultiWidget from "../MultiWidget/MultiWidget";

const WeatherMore = () => {
  const main = useSelector(
    (state: RootState) => state.weatherReducer.data.main
  );
  const wind = useSelector(
    (state: RootState) => state.weatherReducer.data.wind
  );

  const { temp, feels_like, pressure, humidity } = main;

  const tempVal = Math.round(temp).toString();
  const pressureVal = Math.round(pressure).toString();
  const humidityVal = Math.round(humidity).toString();
  const windVal = Object.keys(wind).map((k) => ({
    value: (wind as Record<string, number>)[k].toString(),
    unit: k === "deg" ? "K" : "m/s",
    description: k,
  }));

  return (
    <div className="root">
      <WeatherCard>
        <BasicWidget
          src={tempSVG}
          title="Temperature"
          value={tempVal}
          unit="K"
          description={`Feels like ${feels_like}K`}
          imgStyle={{ height: "80%" }}
          orientation="vertical"
        />
      </WeatherCard>
      <WeatherCard>
        <>
          <BasicWidget
            src={pressureSVG}
            title="Pressure"
            value={pressureVal}
            unit="hPa"
            widgetStyle={{ height: "50%" }}
            imgStyle={{ height: "80%" }}
          />
          <BasicWidget
            src={humiditySVG}
            title="Humidity"
            value={humidityVal}
            unit="%"
            widgetStyle={{ height: "50%" }}
            imgStyle={{ height: "80%" }}
          />
        </>
      </WeatherCard>
      <WeatherCard>
        <MultiWidget
          title="Wind"
          src={winddirectionSVG}
          units={windVal}
          imgStyle={{ height: "80%" }}
        />
      </WeatherCard>
    </div>
  );
};

export default WeatherMore;
