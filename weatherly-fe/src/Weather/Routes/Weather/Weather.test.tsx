import { fireEvent, waitFor } from "@testing-library/react";
import selectEvent from "react-select-event";
import { render, screen } from "../../../Application/Utils/TestUtils";
import Weather from "./Weather";
import Forecast from "../../../Forecast/Routes/Forecast";
import React from "react";

describe("Weather route", () => {
  it("should have default city option on first render", async () => {
    render(<Weather />);
    expect(await screen.findByText("Select City")).toBeInTheDocument();
  });

  it("should allow user select a city", async () => {
    render(<Weather />);

    const Select = await screen.findByLabelText("Cities");

    expect(screen.queryByText("Tokyo")).toBeNull();
    selectEvent.openMenu(Select);
    expect(screen.getByText("Tokyo")).toBeInTheDocument();
  });

  it("should render weather summary and 3 cards when city is selected", async () => {
    const {
      getByLabelText,
      getByText,
      queryByText,
      findByTestId,
      findAllByTestId,
    } = render(<Weather />);

    selectEvent.openMenu(getByLabelText("Cities"));
    fireEvent.click(getByText(/Toronto/i));

    //Weather Now
    expect(await findByTestId("weathernow")).toBeInTheDocument();

    //WeatherMore
    const Cards = await findAllByTestId("weatherCard");
    expect(Cards.length).toEqual(3);
    expect(queryByText(/Temperature/i)).toBeInTheDocument();
    expect(queryByText(/Pressure/i)).toBeInTheDocument();
    expect(queryByText(/Humidity/i)).toBeInTheDocument();
    expect(queryByText(/Wind/i)).toBeInTheDocument();
  });

  it("should render  forecast button when city is selected", async () => {
    const weatherRdr = render(<Weather />);
    const forecastRdr = render(<Forecast />);

    selectEvent.openMenu(weatherRdr.getByLabelText("Cities"));
    fireEvent.click(weatherRdr.getByText("Toronto"));

    expect(
      await forecastRdr.findByText("Toronto's Weather Forecast")
    ).toBeInTheDocument();
    expect(await forecastRdr.findByRole("button")).toBeEnabled();
  });
});
