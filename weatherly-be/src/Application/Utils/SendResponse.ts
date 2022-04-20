import { ServerResponse } from "http";

/**
 * Writes status code and data or error object to response stream
 * @param {ServerResponse} res response object
 * @param {number} status response statuscode
 * @param {any} data data/error object on success/failure
 * @param {Record<string, string>} headers response headers
 */
module.exports = (
  res: ServerResponse,
  status: number,
  data: any,
  headers?: Record<string, string>
) => {
  const sentHeaders = headers
    ? headers
    : {
        "content-type": "application/json",
      };

  const sentData = typeof data === "string" ? data : JSON.stringify(data);

  res.writeHead(status, sentHeaders).write(sentData);
  res.end();
};
