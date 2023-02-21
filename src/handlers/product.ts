import { NextFunction, Request, Response } from 'express';
import prisma from '../db';

// Get all
export const getProducts = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      // @ts-ignore
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });
  res.json({ data: user?.products });
};

// Get one
export const getOneProduct = async (req: Request, res: Response) => {
  const id = req.params.id;

  const product = await prisma.product.findUnique({
    where: {
      id_belongsToId: {
        id,
        // @ts-ignore
        belongsToId: req.user.id,
      },
    },
  });
  res.json({ data: product });
};

// Create
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        // @ts-ignore
        belongsToId: req.user.id,
      },
    });
    res.json({ data: product });
  } catch (err) {
    next(err);
    res.json({ message: 'error' });
  }
};

// Update
export const updateProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name } = req.body;

  const product = await prisma.product.update({
    where: {
      id_belongsToId: {
        id,
        // @ts-ignore
        belongsToId: req.user.id,
      },
    },
    data: {
      name,
    },
  });
  res.json({ data: product });
};

// Delete
export const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id;

  const product = await prisma.product.delete({
    where: {
      id_belongsToId: {
        id,
        // @ts-ignore
        belongsToId: req.user.id,
      },
    },
  });
  res.json({ data: product });
};
