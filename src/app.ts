import express from "express";
import { queryParser } from "express-query-parser";

import notesRouter from "./modules/notes/notes.router";
import pingRouter from "./modules/ping/ping.router";
import { formatResponse } from "./utils/formatResponse";

const app = express();

app.use(
  queryParser({
    parseBoolean: true,
    parseNull: true,
    parseNumber: true,
    parseUndefined: true,
  })
);
app.use(express.json());
app.use("/v1/notes", notesRouter);
app.use("/v1/ping", pingRouter);
app.use("/", (req, res) => {
  return formatResponse(req.query, res, { success: true });
});

export default app;
