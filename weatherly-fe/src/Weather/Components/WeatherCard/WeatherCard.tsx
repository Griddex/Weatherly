import React from "react";

interface IWeatherCard {
  children: JSX.Element;
}

const WeatherCard = ({ children }: IWeatherCard) => {
  return (
    <div data-testid="weatherCard" className="weatherCard">
      {children}
    </div>
  );
};

export default WeatherCard;
