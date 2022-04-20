import { ServerResponse } from "http";
const streamlineForecastData = require("../utils/streamlineForecastData");
const getUrl = require("../../Application/config/urls");
const getData = require("../../Application/utils/getData");

const getForecastService = async (res: ServerResponse, cityId: number) => {
  const forecastUrl = getUrl("forecast", cityId);

  const result = await getData(forecastUrl);
  if (!result.success) {
    const { error } = result;
    res.write(error);
    res.end();
  }

  const hasData = Object.keys(result.data).length > 0;

  if (!hasData) {
    res.writeHead(404).write("No data is present in resource location");
    res.end();
  }

  const list = result.data.list as object[];
  const data = streamlineForecastData(list);

  res.write(JSON.stringify(data));
  res.end();
};

module.exports = getForecastService;
