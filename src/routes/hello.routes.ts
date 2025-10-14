import { Router } from 'express';
import * as HelloController from '../controllers/hello.controller';
import { validate } from '../middlewares/validate.middleware';
import { HelloQuerySchema, HelloBodySchema } from '../schemas/hello.schema';

const router = Router();

// Validate query for GET /api/hello?name=...
router.get('/', validate(HelloQuerySchema, 'query'), HelloController.getHello);

// Validate body for POST /api/hello { "name": "..." }
router.post('/', validate(HelloBodySchema, 'body'), HelloController.postHello);

export default router;
