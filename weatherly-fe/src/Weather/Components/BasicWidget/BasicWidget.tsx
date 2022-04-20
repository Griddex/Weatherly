/**
 * Reusable widget that can represent weather data
 * displayed as image, title, value and description
 */

import React from "react";
import { TOrientation } from "../../../Application/Types";
import WidgetValue from "../WidgetValue/WidgetValue";

interface IBasicWidget {
  src?: string;
  title?: string;
  value: string;
  unit?: string;
  description?: string;
  widgetStyle?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
  orientation?: TOrientation;
}

const BasicWidget = ({
  src,
  title,
  value,
  unit,
  description,
  widgetStyle,
  imgStyle,
  orientation,
}: IBasicWidget) => {
  return (
    <div className="basicWidget" style={widgetStyle}>
      <img className="imgSrc" src={src} style={imgStyle} />
      <div className="titleDesc">
        {title && <p className="widgetTitle">{title}</p>}
        <WidgetValue
          value={value}
          unit={unit}
          description={description}
          orientation={orientation}
        />
      </div>
    </div>
  );
};

export default BasicWidget;
