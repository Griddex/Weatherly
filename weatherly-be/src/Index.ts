import { IncomingMessage, ServerResponse } from "http";
const parseUrl = require("url");
const http = require("http");
require("dotenv").config({ path: `${__dirname}/Application/Config/.env` });
const getWeatherService = require("./Weather/Services/Weather.Service");

const port = process.env.PORT || 5000;
const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const urlObject = parseUrl?.parse(url, true);
    const query = urlObject.query;
    const id = query.id;
    console.log("🚀 ~ file: Index.ts ~ line 14 ~ id", id);

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS"
    );

    if (url?.startsWith("/api/v1/weather")) {
      getWeatherService(res, id);
    } else if (url?.startsWith("/api/v1/forecast")) {
      res.write("Forecast");
      res.end();
    }
  }
);
server.listen(port, () => console.log(`Server running on port ${port}`));
