import express, { Router } from "express";
import sharp from "sharp";
import path from "path";
// eslint-disable-next-line import/extensions
import imageFileName from "../middlewares/imageMiddleware";

const imageRouter = Router();

export interface ReqParamsImage {
  fileName: string;
  width: string;
  height: string;
}

imageRouter.get(
  "/images",
  imageFileName,
  (req: express.Request<unknown, unknown, unknown, ReqParamsImage>, res) => {
    sharp(`images/full/${req.query.fileName}.jpg`)
      .resize(
        parseInt(req.query?.width, 10) ? parseInt(req.query?.width, 10) : null,
        parseInt(req.query?.height, 10) ? parseInt(req.query?.height, 10) : null
      )
      .jpeg({ mozjpeg: true })
      .toFile(`images/thumb/${req.query.fileName}_thumb.jpg`)
      .then(() => {
        res
          .status(200)
          .sendFile(
            path.join(
              __dirname,
              "..",
              "..",
              "images",
              "thumb",
              `${req.query.fileName}_thumb.jpg`
            )
          );
      })
      .catch(() => {
        // console.log(err);
        res.status(500).json({
          message: "error while saving the file to thumb directory",
        });
      });
  }
);

export default imageRouter;
