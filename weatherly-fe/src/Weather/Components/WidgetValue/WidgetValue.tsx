/**
 * Reusable widget that can represent weather data
 * displayed  value, unit and optionally description
 */

import React from "react";

export interface IWidgetValue {
  value: string;
  unit?: string;
  description?: string;
  orientation?: string;
}

const WidgetValue = ({
  value,
  unit,
  description,
  orientation,
}: IWidgetValue) => {
  const style: React.CSSProperties =
    orientation === "vertical" ? { flexDirection: "column" } : {};

  return (
    <div className="widgetValueContainer" style={style}>
      <div className="widgetValue">
        <p className="value">{value}</p>
        <p className="unit">{unit}</p>
      </div>
      {description && <p className="widgetDesc">{description}</p>}
    </div>
  );
};

export default WidgetValue;
