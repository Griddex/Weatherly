import { rest } from "msw";
import { weatherData, forecastData } from "../../Data/TestData";

const handlers = [
  rest.get("http://localhost:5000/api/v1/weather/", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true, data: weatherData }));
  }),
  rest.get("http://localhost:5000/api/v1/forecast/", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ success: true, data: forecastData })
    );
  }),
  rest.get("failurecase", (req, res, ctx) => {
    console.error(`Please add request handler for ${req.url.toString()}`);
    return res(ctx.status(404), ctx.json({ error: "Please add handler" }));
  }),
];

export { handlers };
