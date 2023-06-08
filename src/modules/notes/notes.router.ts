import { Prisma } from "@prisma/client";
import express, { Request } from "express";
import { body, param, query, validationResult } from "express-validator";

import prisma from "../../prisma";
import { formatResponse } from "../../utils/formatResponse";

import { PaginatedRequestBody } from "./notes.types";

const router = express.Router();

//
// CREATE note
//
router.post(
  "/",
  body(["title", "message"]).trim().escape().notEmpty(),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return formatResponse(req.query, res, { errors: result.mapped() }, 400);
    }

    const { title, message } = req.body;

    try {
      const note = await prisma.note.create({
        data: {
          message,
          title,
        },
      });

      return formatResponse(req.query, res, note, 201);
    } catch (error) {
      return formatResponse(req.query, res, error, 400);
    }
  }
);

//
// GET all notes
// GET /notes?limit=(number)&skip=(number)
//
router.get(
  "/",
  query("limit").optional().toInt().isNumeric(),
  query("skip").optional().toInt().isNumeric(),
  async (req: PaginatedRequestBody, res) => {
    const { limit, skip } = req.query;

    try {
      const notes = await prisma.note.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      });

      return formatResponse(req.query, res, {
        count: notes.length,
        results: notes,
      });
    } catch (error) {
      return formatResponse(req.query, res, error, 500);
    }
  }
);

//
// UPDATE note
//
router.put(
  "/:id",
  param("id").toInt().isNumeric(),
  body(["title", "message"]).optional().trim().escape().notEmpty(),
  async (req: Request<{ id: number }>, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return formatResponse(req.query, res, { errors: result.mapped() }, 400);
    }

    const { id } = req.params;
    const { title, message } = req.body;

    try {
      const updatedNote = await prisma.note.update({
        where: { id },
        data: {
          message,
          title,
        },
      });

      return formatResponse(req.query, res, updatedNote);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          return formatResponse(
            req.query,
            res,
            { code: 404, message: "Note does not exist" },
            404
          );
        }
      }

      return formatResponse(req.query, res, error, 500);
    }
  }
);

//
// GET note by ID
//
router.get(
  "/:id",
  param("id").toInt().isNumeric(),
  async (req: Request<{ id: number }>, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return formatResponse(req.query, res, { errors: result.mapped() }, 400);
    }

    const { id } = req.params;

    try {
      const note = await prisma.note.findUnique({ where: { id } });

      if (!note) {
        return formatResponse(
          req.query,
          res,
          { code: 404, message: "Note does not exist" },
          404
        );
      }

      return formatResponse(req.query, res, note);
    } catch (error) {
      return formatResponse(req.query, res, error, 500);
    }
  }
);

//
// DELETE note
//
router.delete(
  "/:id",
  param("id").toInt().isNumeric(),
  async (req: Request<{ id: number }>, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return formatResponse(req.query, res, { errors: result.mapped() }, 400);
    }

    const { id } = req.params;

    try {
      const note = await prisma.note.delete({ where: { id } });

      if (!note) {
        return formatResponse(
          req.query,
          res,
          { code: 404, message: "Note does not exist" },
          404
        );
      }

      return formatResponse(req.query, res, { success: true });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          return formatResponse(
            req.query,
            res,
            { code: 404, message: "Note does not exist" },
            404
          );
        }
      }

      return formatResponse(req.query, res, error, 500);
    }
  }
);

export default router;
