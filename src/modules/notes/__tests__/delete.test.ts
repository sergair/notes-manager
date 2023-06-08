import request from "supertest";

import { prismaMock } from "../../../../__mocks__/prisma.mock";
import app from "../../../app";
import { NOTE_ONE } from "../testData";

describe("DELETE Note endpoint", () => {
  it("should delete the note", async () => {
    prismaMock.note.delete.mockResolvedValue(NOTE_ONE);
    const { id } = NOTE_ONE;

    const { body } = await request(app).delete(`/v1/notes/${id}`).expect(200);

    expect(body.success).toBe(true);
  });

  it("should not delete non-existing note", async () => {
    prismaMock.note.delete.mockImplementation();
    const { id } = NOTE_ONE;

    const { body } = await request(app).delete(`/v1/notes/${id}`).expect(404);

    expect(body.code).toBe(404);
    expect(body.message).toBe("Note does not exist");
  });
});
