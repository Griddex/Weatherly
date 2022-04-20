/**
 * Displays several buttons, each representing a unique day in the forecast data
 */
import React from "react";

interface IDays {
  days: string[];
  selectedDay: string;
  setSelectedDay: React.Dispatch<React.SetStateAction<string>>;
}

const Days = ({ days, selectedDay, setSelectedDay }: IDays) => {
  const baseStyle = {
    width: 60,
    height: 40,
  };

  return (
    <div className="days">
      {days.map((d) => {
        const style =
          d === selectedDay
            ? {
                ...baseStyle,
                backgroundColor: "#FF0000E0",
                borderRadius: 4,
                borderColor: "rgba(255,0,0,0.88)",
                borderStyle: "none",
                color: "white",
                fontWeight: "bold",
              }
            : baseStyle;

        const dis = new Date(d).toLocaleDateString("en-us", {
          month: "short",
          day: "numeric",
        });

        return (
          <button key={d} style={style} onClick={() => setSelectedDay(d)}>
            {dis}
          </button>
        );
      })}
    </div>
  );
};

export default Days;
