/**
 * Forecast service to accept user request,
 * call 3rd part weather api and return forecast data
 * @param {ServerResponse} res response object
 * @param {number} cityNameCtry city id for forecast data retrieval
 */

import { ServerResponse } from "http";
const streamlineForecastData = require("../utils/streamlineForecastData");
const getUrl = require("../../Application/config/urls");
const getData = require("../../Application/utils/getData");
const sendResponse = require("../../Application/utils/sendResponse");

const getForecastService = async (res: ServerResponse, cityNameCtry: number) => {
  const forecastUrl = getUrl("forecast", cityNameCtry);

  const result = await getData(forecastUrl);
  if (!result.success) {
    const { error } = result;
    sendResponse(res, res.statusCode, (error as Record<string, any>).message);
  }

  const hasData = Object.keys(result.data).length > 0;

  if (!hasData) {
    res.writeHead(404).write("No data is present in resource location");
    res.end();
  }

  const list = result.data.list as object[];
  const forecastData = streamlineForecastData(list);

  sendResponse(res, 200, {
    success: true,
    data: forecastData,
  });
};

module.exports = getForecastService;
