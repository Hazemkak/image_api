import express, { Router } from "express";
import imageFileName from "../middlewares/imageMiddleware";
import sharp from "sharp";

const imageRouter = Router();

export interface ReqParamsImage {
  fileName: string;
  width: number;
  height: number;
}

imageRouter.get(
  "/images",
  imageFileName,
  (req: express.Request<unknown, unknown, unknown, ReqParamsImage>, res) => {
    console.log(
      "received params are  ",
      req.query.fileName,
      req.query.width,
      req.query.height
    );
    res.json({});
  }
);

export default imageRouter;
