import express from "express";
import path from "path";
// eslint-disable-next-line import/extensions
import imageRouter from "./routes/imageRoute";

const app = express();
app.use(express.static(path.join(__dirname, "..", "images")));
const PORT = 3000;

app.use("/api", imageRouter);

app.listen(PORT, () =>
  console.log(`CONNECTED ON PORT ${PORT}  http://localhost:${PORT}`)
);

export default app;
