/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import path from "path";
import { promises as filePromise } from "fs";
// eslint-disable-next-line import/extensions
import imageProcess from "../utilities/imageProcessing";

describe("testing the image processing file", (): void => {
  const imagePath = path.join(
    __dirname,
    "..",
    "..",
    "images",
    "full",
    `icelandwaterfall.jpg`
  );
  const storePath = path.join(
    __dirname,
    "..",
    "..",
    "images",
    "thumb",
    `icelandwaterfall_70_60.jpg`
  );
  it("the function should store the file in the desired path with desired name", async (): Promise<void> => {
    const image = await imageProcess(imagePath, 70, 60, storePath)
      .then(() =>
        filePromise
          .readFile(storePath)
          .then((data) => data)
          .catch(() => false)
      )
      .catch(() => false);
    expect(image).toBeTruthy();
  });
});
