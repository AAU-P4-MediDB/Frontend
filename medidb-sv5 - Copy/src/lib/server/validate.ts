import { fail } from '@sveltejs/kit';
import type { ZodSchema } from 'zod';

export function validate<T>(schema: ZodSchema<T>, data: unknown):
    | { data: T; error: null }
    | { data: null; error: ReturnType<typeof fail> }
{
    const result = schema.safeParse(data);
    if (!result.success) {
        return {
            data: null,
            error: fail(400, { errors: result.error.flatten() }),
        };
    }
    return { data: result.data, error: null };
}
