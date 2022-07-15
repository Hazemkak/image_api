/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import express from "express";
import { promises as filePromise } from "fs";
import path from "path";
import { ReqParamsImage } from "../routes/imageRoute";

const imageFileName = (
  req: express.Request<unknown, unknown, unknown, ReqParamsImage>,
  res: express.Response,
  next: Function
): void => {
  const targetPath = `${req.query.fileName}.jpg`;
  filePromise
    .readFile(path.join(__dirname, "..", "..", "images", "full", targetPath))
    .then(() => next())
    .catch(() =>
      res
        .status(404)
        .json({ message: `no file is found named ${req.query.fileName}` })
    );
};

const imageAlreadyExists = (
  req: express.Request<unknown, unknown, unknown, ReqParamsImage>,
  res: express.Response,
  next: Function
): void => {
  const width = parseInt(req.query?.width, 10)
    ? parseInt(req.query?.width, 10)
    : null;
  const height = parseInt(req.query?.height, 10)
    ? parseInt(req.query?.height, 10)
    : null;
  const targetPath = `${req.query.fileName}_${width}_${height}.jpg`;
  filePromise
    .readFile(path.join(__dirname, "..", "..", "images", "thumb", targetPath))
    .then(() =>
      res
        .status(200)
        .sendFile(
          path.join(__dirname, "..", "..", "images", "thumb", targetPath)
        )
    )
    .catch(() => next());
};
export { imageFileName, imageAlreadyExists };
