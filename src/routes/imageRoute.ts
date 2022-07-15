/* eslint-disable import/extensions */
import express, { Router } from "express";
import path from "path";
import * as imageMiddleWare from "../middlewares/imageMiddleware";
import imageProcess from "../utilities/imageProcessing";

const imageRouter = Router();

export interface ReqParamsImage {
  fileName: string;
  width: string;
  height: string;
}

imageRouter.get(
  "/images",
  imageMiddleWare.imageFileName,
  imageMiddleWare.imageAlreadyExists,
  (req: express.Request<unknown, unknown, unknown, ReqParamsImage>, res) => {
    const width = parseInt(req.query?.width, 10)
      ? parseInt(req.query?.width, 10)
      : null;
    const height = parseInt(req.query?.height, 10)
      ? parseInt(req.query?.height, 10)
      : null;
    const imgNewName = `${req.query.fileName}_${width}_${height}.jpg`;
    // sending the query params to image processing module
    imageProcess(
      `images/full/${req.query.fileName}.jpg`,
      width,
      height,
      `images/thumb/${imgNewName}`
    )
      .then(() => {
        res
          .status(200)
          .sendFile(
            path.join(__dirname, "..", "..", "images", "thumb", imgNewName)
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
