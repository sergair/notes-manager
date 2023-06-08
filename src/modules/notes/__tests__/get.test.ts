import request from "supertest";

import { prismaMock } from "../../../../__mocks__/prisma.mock";
import app from "../../../app";
import { NOTE_ONE, NOTE_TWO } from "../testData";

describe("GET Note endpoint", () => {
  it("should get a single note", async () => {
    prismaMock.note.findUnique.mockResolvedValue(NOTE_ONE);

    const { id, title, message } = NOTE_ONE;

    const { body } = await request(app).get(`/v1/notes/${id}`).expect(200);

    expect(body.title).toBe(title);
    expect(body.message).toBe(message);
  });

  it("should throw 404 error for non-exsiting note", async () => {
    prismaMock.note.findUnique.mockResolvedValue(null);

    const { id } = NOTE_ONE;

    await request(app).get(`/v1/notes/${id}`).expect(404);
  });

  it("should get multiple notes", async () => {
    prismaMock.note.findMany.mockResolvedValue([NOTE_ONE, NOTE_TWO]);

    const { body } = await request(app).get("/v1/notes").expect(200);

    expect(body.count).toBe(2);
    expect(body.results.length).toBe(2);
  });
});
