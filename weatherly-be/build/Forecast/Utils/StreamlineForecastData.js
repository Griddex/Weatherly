"use strict";
const dateRegex = /\d{4}\-\d{2}\-\d{2}/;
module.exports = (list) => {
    const body = list.reduce((acc, row) => {
        const { dt_txt, main, weather, wind, visibility } = row;
        const existingKeys = Object.keys(acc);
        const currentkey = dt_txt.match(dateRegex)[0];
        const rowObj = {
            temp: main["temp"],
            feelsLike: main["feels_like"],
            minTemp: main["temp_min"],
            maxTemp: main["temp_max"],
            pressure: main["pressure"],
            humidity: main["humidity"],
            weather: weather[0]["description"],
            windSpeed: wind["speed"],
            visibility,
        };
        if (existingKeys.includes(currentkey)) {
            const existingRows = acc[currentkey];
            acc[currentkey] = [...existingRows, rowObj];
        }
        else {
            acc[currentkey] = [rowObj];
        }
        return acc;
    }, {});
    const days = Object.keys(body);
    const firstDay = days[0];
    const headers = Object.keys(body[firstDay][0]).map((h) => h.toUpperCase());
    return { headers, body, days };
};
