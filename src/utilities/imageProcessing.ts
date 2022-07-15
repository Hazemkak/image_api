import sharp from "sharp";

const imageProcess = (
  path: string,
  width: number | null,
  height: number | null,
  storePath: string
): Promise<unknown> =>
  sharp(path).resize(width, height).jpeg({ mozjpeg: true }).toFile(storePath);

export default imageProcess;
