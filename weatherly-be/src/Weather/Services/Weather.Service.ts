/**
 * Weather service to accept user request,
 * call 3rd part weather api and return weather data
 * @param {ServerResponse} res response object
 * @param {number} cityNameCtry city id for weather data retrieval
 */

import { ServerResponse } from "http";
const getUrl = require("../../Application/config/urls");
const getData = require("../../Application/utils/getData");
const sendResponse = require("../../Application/utils/sendResponse");

//getWeatherService
const getWeatherService = async (res: ServerResponse, cityNameCtry: number) => {
  const weatherUrl = getUrl("weather", cityNameCtry);
  const result = await getData(weatherUrl);
  

  if (!result.success) {
    const { error } = result;
    sendResponse(res, res.statusCode, (error as Record<string, any>).message);
  }

  const { data } = result;
  const hasData = Object.keys(data).length > 0;

  if (!hasData) {
    res.writeHead(404).write("No data is present in resource location");
    res.end();
  }

  const { weather, main, visibility, wind } = data;
  sendResponse(res, 200, {
    success: true,
    data: { weather, main, visibility, wind },
  });
};


module.exports = getWeatherService;
