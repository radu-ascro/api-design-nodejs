import { Request, Response } from 'express';
import prisma from '../db';

export const getOneUpdate = async (req: Request, res: Response) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: update });
};
export const getUpdates = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      // @ts-ignore
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  // @ts-ignore
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  res.json({ data: updates });
};
export const createUpdate = async (req: Request, res: Response) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });

  if (!product) {
    // does not belong to user
    return res.json({ message: 'nope' });
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      product: { connect: { id: product.id } },
    },
  });

  res.json({ data: update });
};
export const updateUpdate = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      // @ts-ignore
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  // @ts-ignore
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  // @ts-ignore
  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    return res.json({ message: 'nope' });
  }

  const updateUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.json({ data: updateUpdate });
};
export const deleteUpdate = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      // @ts-ignore
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  // @ts-ignore
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  // @ts-ignore
  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    return res.json({ message: 'nope' });
  }

  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: deleted });
};
