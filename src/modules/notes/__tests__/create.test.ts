import request from "supertest";

import { prismaMock } from "../../../../__mocks__/prisma.mock";
import app from "../../../app";
import { NOTE_ONE } from "../testData";

describe("CREATE Note endpoint", () => {
  it("should create a note", async () => {
    prismaMock.note.create.mockResolvedValue(NOTE_ONE);

    const { body } = await request(app)
      .post("/v1/notes")
      .send({ title: NOTE_ONE.title, message: NOTE_ONE.message })
      .expect(201);

    expect(body.title).toBe(NOTE_ONE.title);
    expect(body.message).toStrictEqual(NOTE_ONE.message);
  });

  it("should throw validation error", async () => {
    const { body } = await request(app)
      .post("/v1/notes")
      .send({ title: NOTE_ONE.title })
      .expect(400);

    expect(body.errors.message.msg).toBe("Invalid value");
  });
});
