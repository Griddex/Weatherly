import { IncomingMessage, ServerResponse } from "http";

const http = require("http");

const port = 5000;
const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {}
);
server.listen(port, () => console.log(`Server running on port 5000`));
