import { IncomingMessage, ServerResponse } from "http";
const parseUrl = require("url");
const http = require("http");

const port = 5000;
const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const urlObject = parseUrl?.parse(url, true);
    const query = urlObject.query;
    const id = query.id;

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
      console.log(id);
      res.write("Weather");
      res.end();
    } else if (url?.startsWith("/api/v1/forecast")) {
      res.write("Forecast");
      res.end();
    }
  }
);
server.listen(port, () => console.log(`Server running on port 5000`));
