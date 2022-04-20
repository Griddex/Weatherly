const getData = require("../../../Application/Utils/GetData");
require("dotenv").config({ path: `${__dirname}/Application/config/.env` });

describe("Weather Service", () => {
  jest.mock("axios");

  console.log(process.env.APPID);
  console.log(process.env.APPBASEURL);

  const url =
    "http://api.openweathermap.org/data/2.5/weather/?id=6167865&appid=538882fc8387290c6cee83f313a6acf5";

  it("will fetch weather data from api", async () => {
    const exptdKeys = ["weather", "main", "visibility", "wind"];
    const result = await getData(url);
    const rvdKeys = Object.keys(result.data);

    expect(rvdKeys).toEqual(expect.arrayContaining(exptdKeys));
  });

  it("will fail", async () => {
    await expect(
      getData(
        "http://api.openweathermap.org/data/2.5/weather/?id=6167865&appid=538882fc8387290c6cee83f313a6acf5/failurecase"
      )
    ).resolves.toBeTruthy();
  });
});
