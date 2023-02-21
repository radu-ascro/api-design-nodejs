import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';

export const comparePasswords = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5);
};

//@ts-ignore
export const createJWT = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    // @ts-ignore
    process.env.JWT_SECRET
  );
  return token;
};

//@ts-ignore
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ error: 'Not authorized' });
    return;
  }

  const [, token] = bearer.split(' ');
  if (!token) {
    res.status(401);
    res.json({ error: 'Not authorized two' });
    return;
  }

  try {
    //@ts-ignore
    const user = jwt.verify(token, process.env.JWT_SECRET);
    //@ts-ignore
    req.user = user;
    next();
  } catch (e) {
    res.status(401);
    res.json({ error: 'Not valid token' });
    return;
  }
};
