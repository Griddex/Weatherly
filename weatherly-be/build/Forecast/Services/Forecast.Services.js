"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const streamlineForecastData = require("../utils/streamlineForecastData");
const getUrl = require("../../Application/config/urls");
const getData = require("../../Application/utils/getData");
const getForecastService = (res, cityId) => __awaiter(void 0, void 0, void 0, function* () {
    const forecastUrl = getUrl("forecast", cityId);
    const result = yield getData(forecastUrl);
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
    const list = result.data.list;
    const data = streamlineForecastData(list);
    res.write(JSON.stringify(data));
    res.end();
});
module.exports = getForecastService;
