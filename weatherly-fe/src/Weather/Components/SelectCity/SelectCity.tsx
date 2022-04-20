import React from "react";
import Select, { ActionMeta, StylesConfig } from "react-select";
import { TOption } from "../../../Application/Types";

export interface ISelectCity {
  selectedOption: TOption;
  options: TOption[];
  handleSelect: (newValue: any, actionMeta: ActionMeta<any>) => void;
}

const style: StylesConfig<TOption, false> = {
  container: (styles) => ({ ...styles, width: "20rem" }),
  singleValue: (styles) => ({ ...styles, fontWeight: "bold" }),
  option: (styles, { isSelected, isFocused }) => ({
    ...styles,
    backgroundColor: isSelected ? "#3CBCCD" : isFocused ? "#E8F7F9" : "white",
    ":active": {
      ...styles[":active"],
      backgroundColor: isSelected ? "#3CBCCD" : "#E8F7F9",
    },
  }),
  control: (styles) => ({
    ...styles,
    border: "2px solid #3CBCCD",
    boxShadow: "none",
    ":hover": { borderColor: "#3CBCCD" },
  }),
};

const SelectCity = ({ selectedOption, options, handleSelect }: ISelectCity) => {
  return (
    <form data-testid="form">
      <label htmlFor="city" className="selectCity">
        Cities
      </label>
      <Select
        name="city"
        inputId="city"
        styles={style}
        value={selectedOption}
        options={options}
        onChange={handleSelect}
      />
    </form>
  );
};

export default SelectCity;
