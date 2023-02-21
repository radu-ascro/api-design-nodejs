import express, { NextFunction, Request, Response } from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';

const app = express();

/**
 * Middleware
 */
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Express app
 */
app.get('/', (req, res) => {
  console.log('Hello from express!');
  res.status(200).json({ message: 'hello' });
});
/**
 * App router
 */
app.use('/api', protect, router);

app.post('/user', createNewUser);
app.post('/signin', signin);

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
  if (err.type === 'auth') {
    res.status(401).json({ message: 'unauthorized' });
    //@ts-ignore
  } else if (err.type === 'input') {
    res.status(400).json({ message: 'invalid input' });
  } else {
    res.status(500).json({ message: 'oops, thats on us' });
  }
});

export default app;
