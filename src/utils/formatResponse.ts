import { Response } from "express";

enum FormatType {
  JSON = "json",
  JSONP = "jsonp",
}

export interface FormatRequestQuery {
  format?: FormatType;
  callback?: string;
}

/**
 * Formats response in JSON or JSONP format
 * @param query Request query params
 * @param res Express response object
 * @param body Return payload
 * @param statusCode Response HTTP status
 */
export const formatResponse = (
  query: FormatRequestQuery | undefined,
  res: Response,
  body: any,
  statusCode = 200
) => {
  if (!query?.format) {
    return res.status(statusCode).send(body);
  }

  switch (query.format) {
    case FormatType.JSON:
      return res.status(statusCode).send(body);
    case FormatType.JSONP:
      return res.status(statusCode).jsonp(body);

    default:
      return res.status(400).send("Unsupported format");
  }
};
