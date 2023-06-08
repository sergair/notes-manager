import { FormatRequestQuery } from "../../utils/formatResponse";

export interface PaginatedRequestBody extends Express.Request {
  query: {
    limit?: number;
    skip?: number;
  } & FormatRequestQuery;
}
