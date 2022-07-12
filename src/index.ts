import express from 'express';
import imageRouter from './routes/imageRoute';

const app = express();
const PORT = 3000;

app.use('/api', imageRouter);

app.listen(PORT, () => console.log(`CONNECTED ON PORT ${PORT}  http://localhost:${PORT}`));
