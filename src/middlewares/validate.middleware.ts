import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

type Location = 'body' | 'query' | 'params';

export function validate<T extends ZodSchema<any>>(schema: T, where: Location = 'body') {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const toValidate = (req as any)[where];
      const parsed = schema.parse(toValidate); // throws ZodError if invalid
      // Replace the raw input with the parsed, typed, and transformed data
      (req as any)[where] = parsed;
      next();
    } catch (err) {
      next(err);
    }
  };
}
