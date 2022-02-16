import 'reflect-metadata';
import express from 'express';
import { initializeRouter } from './routes';
import { connectDatabase } from './database';

connectDatabase();
const app = express();
app.use(express.json());
initializeRouter(app);



export default app;