import { Request, Response, Router } from 'express';
import { body, check, oneOf } from 'express-validator';
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
} from './handlers/product';
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from './handlers/update';
import { handleInputErrors } from './modules/middlewate';

const router = Router();

/**
 * Product
 */
router.get('/product', getProducts);
router.get('/product/:id', getOneProduct);
router.put(
  '/product/:id',
  body('name').isString(),
  handleInputErrors,
  (req: Request, res: Response) => {}
);
router.post(
  '/product/',
  body('name').isString(),
  handleInputErrors,
  createProduct
);
router.delete('/product/:id', deleteProduct);

/**
 * Update
 */
router.get('/update', getUpdates);
router.get('/update/:id', getOneUpdate);
router.put(
  '/update/:id',
  body('title').optional(),
  body('body').optional(),
  body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
  body('version').optional(),
  updateUpdate
);
router.post(
  '/update',
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('productId').exists().isString(),
  createUpdate
);
router.delete('/update/:id', deleteUpdate);

/**
 * Update Point
 */
router.get('/updatepoint', () => {});
router.get('/updatepoint/:id', () => {});
router.put(
  '/updatepoint/:id',
  body('name').isString(),
  body('description').isString(),
  body('updateid').exists().isString(),
  () => {}
);
router.post('/updatepoint', () => {});
router.delete('/updatepoint/:id', () => {});

export default router;
