import { IncomingMessage, ServerResponse } from "http";
const parseUrl = require("url");
const http = require("http");
const cors = require("cors");
require("dotenv").config({ path: `${__dirname}/Application/Config/.env` });
const getWeatherService = require("./Weather/Services/Weather.Service");
const getForecastService = require("./Forecast/Services/Forecast.Services");

import express, {Request, Response} from "express"

// var app = express()
// app.use(express.json())
// app.use(cors())

// app.get("/",(req: Request, res:Response )=>{res.send("Homeeeeeee")})

// app.get("/api/v1/weather",(req: Request, res:Response )=>{
//   console.log("req",req)
//  res.status(200).send("Greattttttttt")
// })

const port = process.env.PORT || 8080;

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const urlObject = parseUrl?.parse(url, true);
    const query = urlObject.query;
    const q = query.q;

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
      getWeatherService(res, q);
    } else if (url?.startsWith("/api/v1/forecast")) {
      getForecastService(res, q);
    } else {
      res.writeHead(404).write(url);
      res.end();
    }
  }
);
// app.listen(port, () => console.log(`Server running on port ${port}`));
server.listen(port, () => console.log(`Server running on port ${port}`));
