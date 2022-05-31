import { fireEvent } from "@testing-library/react";
import selectEvent from "react-select-event";
import { render } from "../../Application/Utils/TestUtils";
import Weather from "../../Weather/Routes/Weather/Weather";
import Forecast from "./Forecast";
import React from "react";

describe("Forecast.tsx", () => {
  it("should render forecast table when button is clicked", async () => {
    const weatherRdr = render(<Weather />);
    const forecastRdr = render(<Forecast />);

    const Select = await weatherRdr.findByLabelText("Cities");
    selectEvent.openMenu(Select);

    const Option = await weatherRdr.findByText("Toronto");
    fireEvent.click(Option);
    const Button = await forecastRdr.findByRole("button");

    fireEvent.click(Button);
    expect(await forecastRdr.findByRole("table")).toBeInTheDocument();
    expect(
      await forecastRdr.findByRole("button", { name: "Show" })
    ).toBeDisabled();
  });
});
