import express from "express";

import { formatResponse } from "../../utils/formatResponse";

const router = express.Router();

//
// GET note by ID
//
router.get("/", async (req, res) => {
  return formatResponse(req.query, res, { pong: true });
});

export default router;
