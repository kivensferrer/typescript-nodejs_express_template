import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

type Location = 'body' | 'query' | 'params';

declare module 'express-serve-static-core' {
  interface Request {
    validated?: {
      body?: unknown;
      query?: unknown;
      params?: unknown;
    };
  }
}

export function validate<T extends ZodSchema<any>>(schema: T, where: Location = 'body') {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const input = (req as any)[where];
      const parsed = schema.parse(input);

      // Put parsed result in a safe bucket; don't assign to req.query/params directly
      req.validated = { ...(req.validated ?? {}), [where]: parsed };
      next();
    } catch (err) {
      next(err);
    }
  };
}
