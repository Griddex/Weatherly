import React from "react";
import Forecast from "../../Forecast/Routes/Forecast";
import Weather from "../../Weather/Routes/Weather/Weather";
import Banner from "../Components/Banner/Banner";

const Layout = () => {
  return (
    <div>
      <Banner />
      <Weather />
      <Forecast />
    </div>
  );
};

export default Layout;
