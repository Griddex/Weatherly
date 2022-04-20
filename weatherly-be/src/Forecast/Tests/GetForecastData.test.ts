const getData = require("../../Application/Utils/GetData");
require("dotenv").config({ path: `${__dirname}/Application/config/.env` });

describe("Forecast Service", () => {
  jest.mock("axios");

  const url =
    "http://api.openweathermap.org/data/2.5/forecast/?id=6167865&appid=538882fc8387290c6cee83f313a6acf5";

  it("will fetch forecast data from api", async () => {
    const exptdKeys = ["list", "city"];
    const result = await getData(url);
    const rvdKeys = Object.keys(result.data);

    expect(result.data["list"].length).toBeGreaterThan(0);
    expect(rvdKeys).toEqual(expect.arrayContaining(exptdKeys));
  });

  it("will fail", async () => {
    await expect(
      getData(
        "http://api.openweathermap.org/data/2.5/forecast/?id=6167865&appid=538882fc8387290c6cee83f313a6acf5/failurecase"
      )
    ).resolves.toBeTruthy();
  });
});

export {};
