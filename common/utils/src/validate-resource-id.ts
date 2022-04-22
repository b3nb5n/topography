import { z } from 'zod'

export const resourceIdSchema = z.string().regex(/^[a-zA-Z0-9]{16}$/)
export const validateResourceId = (data: unknown) =>
	resourceIdSchema.safeParse(data).success
