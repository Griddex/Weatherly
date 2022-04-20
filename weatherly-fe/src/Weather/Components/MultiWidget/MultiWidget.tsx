/**
 * Reusable widget that can represent weather data
 * displayed as image, title, value and description
 */

import React from "react";
import WidgetValue, { IWidgetValue } from "../WidgetValue/WidgetValue";

interface IMultiWidget {
  title?: string;
  src?: string;
  units: IWidgetValue[];
  widgetStyle?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
}

const MultiWidget = ({
  title,
  src,
  units,
  widgetStyle,
  imgStyle,
}: IMultiWidget) => {
  return (
    <div className="multiWidget" style={widgetStyle}>
      <img className="multiImg" src={src} style={imgStyle} />
      <div className="multiTitleDesc">
        <p className="multiTitle">{title}</p>
        {units.map((unit) => (
          <WidgetValue key={unit.description} {...unit} />
        ))}
      </div>
    </div>
  );
};

export default MultiWidget;
