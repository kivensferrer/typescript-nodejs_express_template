import { z } from 'zod';

/**
 * If client provides a name, ensure it's a non-empty, trimmed string
 * with a reasonable max length. Name is optional — service will still default to "World".
 */
export const HelloQuerySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'name must not be empty')
    .max(50, 'name must be at most 50 characters')
    .optional(),
});

export const HelloBodySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'name must not be empty')
    .max(50, 'name must be at most 50 characters')
    .optional(),
});

// Handy TypeScript types (optional but nice in controllers/services)
export type HelloQuery = z.infer<typeof HelloQuerySchema>;
export type HelloBody  = z.infer<typeof HelloBodySchema>;
