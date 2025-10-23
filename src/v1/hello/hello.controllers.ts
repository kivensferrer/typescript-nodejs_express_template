import { Request, Response, NextFunction } from 'express';
import { HelloService } from './hello.services';
import type { HelloQuery, HelloBody } from '../../schemas/hello.schema';
import { Logger } from '../../utils/logging';

const service = new HelloService();

export function getHello(req: Request, res: Response, next: NextFunction) {
  Logger.info('GET /hello called', 'HelloController', { ip: req.ip });
  try {
    // At this point req.query has been validated & trimmed
    const { name } = req.query as unknown as HelloQuery;
    const message = service.greet(name ?? 'World');
    res.json({ message });
  } catch (err) {
    Logger.error('Failed to handle GET /hello', 'HelloController', { err });
    next(err);
  }
}

export function postHello(req: Request, res: Response, next: NextFunction) {
  Logger.info('POST /hello called', 'HelloController', { ip: req.ip });
  try {
    // req.body is validated & trimmed
    const { name } = req.body as HelloBody;
    const message = service.greet(name ?? 'World');
    res.status(201).json({ message });
  } catch (err) {
    Logger.error('Failed to handle POST /hello', 'HelloController', { err });
    next(err);
  }
}
