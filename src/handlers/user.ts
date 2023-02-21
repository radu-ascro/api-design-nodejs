import { NextFunction, Request, Response } from 'express';
import prisma from '../db';
import { hashPassword, createJWT, comparePasswords } from '../modules/auth';

export const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    // @ts-ignore
    err.type = 'input';
    next(err);
  }
};

export const signin = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  // @ts-ignore
  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.send('Invalid username or password');
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
