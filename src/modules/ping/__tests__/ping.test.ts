import request from "supertest";

import app from "../../../app";

describe("Ping endpoint", () => {
  it("should return pong", async () => {
    const { body } = await request(app).get("/v1/ping").expect(200);

    expect(body.pong).toBe(true);
  });

  it("should return in JSONP format", async () => {
    const { text } = await request(app)
      .get("/v1/ping?format=jsonp&callback=cb")
      .expect(200);

    expect(text).toBe("/**/ typeof cb === 'function' && cb({\"pong\":true});");
  });
});
