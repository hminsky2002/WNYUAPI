import express from 'express';
import cors from 'cors';
import { rootRouter } from './routers';

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', rootRouter);

export { app };
