/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */

import supertest from "supertest";
import { promises as File } from "fs";
import path from "path";
// eslint-disable-next-line import/extensions
import app from "../index";

const request = supertest(app);

describe("Testing the /api/images endpoint GET ERROR HANDLING", (): void => {
  it("endpoint will throw error in case no fileName", async (): Promise<void> => {
    const data = await request.get("/api/images");
    expect(data.status).toEqual(404);
  });
  it("endpoint will throw error json with message", async (): Promise<void> => {
    const data = await request.get("/api/images");
    expect(data.body).toEqual({
      message: `no file is found named ${undefined}`,
    });
  });
  it("endpoint will throw error json with message include fileName", async (): Promise<void> => {
    const fileName = "fakeImage";
    const data = await request.get("/api/images").query({ fileName });
    expect(data.body).toEqual({
      message: `no file is found named ${fileName}`,
    });
  });
});

describe("Testing the /api/images endpoint GET SUCCESS HANDLING", (): void => {
  const realImage = "palmtunnel";
  const dimensions = { width: 50, height: 100 };
  it("endpoint will return status 200", async (): Promise<void> => {
    const data = await request
      .get("/api/images")
      .query({ fileName: realImage });
    expect(data.status).toEqual(200);
  });

  it("endpoint will save the resized file", async (): Promise<void> => {
    await request.get("/api/images").query({
      fileName: realImage,
      width: dimensions.width,
      height: dimensions.height,
    });
    expect(
      File.readFile(
        path.join(
          __dirname,
          "..",
          "..",
          "images",
          "thumb",
          `${realImage}_${dimensions.width}_${dimensions.height}.jpg`
        )
      )
    ).toBeTruthy();
  });
});
