import { z } from 'zod'

export const resourceIdSchema = z.string().regex(/^[a-zA-Z0-9]{16}$/)
export const validateResourceId = (id: unknown): id is string =>
	resourceIdSchema.safeParse(id).success
