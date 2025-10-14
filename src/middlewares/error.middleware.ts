import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function notFound(req: Request, res: Response, _next: NextFunction) {
  res.status(404).json({ error: 'Not Found', path: req.originalUrl });
}

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  // Handle Zod validation errors with a clean 400
  if (err instanceof ZodError) {
    const issues = err.issues.map(i => ({
      path: i.path.join('.'),
      message: i.message
    }));
    return res.status(400).json({
      error: 'ValidationError',
      issues
    });
  }

  // Fallback
  console.error(err);
  const status = err?.status || 500;
  res.status(status).json({
    error: err?.message || 'Internal Server Error'
  });
}
