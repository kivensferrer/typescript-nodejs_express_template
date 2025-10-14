import { Request, Response, NextFunction } from 'express';
import { HelloService } from '../services/hello.service';
import type { HelloQuery, HelloBody } from '../schemas/hello.schema';

const service = new HelloService();

export function getHello(req: Request, res: Response, next: NextFunction) {
  try {
    // At this point req.query has been validated & trimmed
    const { name } = req.query as unknown as HelloQuery;
    const message = service.greet(name ?? 'World');
    res.json({ message });
  } catch (err) {
    next(err);
  }
}

export function postHello(req: Request, res: Response, next: NextFunction) {
  try {
    // req.body is validated & trimmed
    const { name } = req.body as HelloBody;
    const message = service.greet(name ?? 'World');
    res.status(201).json({ message });
  } catch (err) {
    next(err);
  }
}
