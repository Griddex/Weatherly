import React from "react";
import Weather from "../../Weather/Routes/Weather/Weather";
import Banner from "../Components/Banner/Banner";

const Layout = () => {
  return (
    <div>
      <Banner />
      <Weather />
    </div>
  );
};

export default Layout;
