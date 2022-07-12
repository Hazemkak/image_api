/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import express from "express";
import { promises as filePromise } from "fs";
import { ReqParamsImage } from "../routes/imageRoute";

const imageFileName = (
  req: express.Request<unknown, unknown, unknown, ReqParamsImage>,
  res: express.Response,
  next: Function
): void => {
  filePromise
    .readFile(`images/${req.query.fileName}.jpg`)
    .then(() => next())
    .catch(() =>
      res.json({ message: `no file is found named ${req.query.fileName}` })
    );
};

export default imageFileName;
