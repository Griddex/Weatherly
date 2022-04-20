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
const getData = require("../../Application/Utils/GetData");
require("dotenv").config({ path: `${__dirname}/Application/config/.env` });
describe("Forecast Service", () => {
    jest.mock("axios");
    const url = "http://api.openweathermap.org/data/2.5/forecast/?id=6167865&appid=538882fc8387290c6cee83f313a6acf5";
    it("will fetch forecast data from api", () => __awaiter(void 0, void 0, void 0, function* () {
        const exptdKeys = ["list", "city"];
        const result = yield getData(url);
        const rvdKeys = Object.keys(result.data);
        expect(result.data["list"].length).toBeGreaterThan(0);
        expect(rvdKeys).toEqual(expect.arrayContaining(exptdKeys));
    }));
    it("will fail", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(getData("http://api.openweathermap.org/data/2.5/forecast/?id=6167865&appid=538882fc8387290c6cee83f313a6acf5/failurecase")).resolves.toBeTruthy();
    }));
});
