import { z } from 'zod'

const resourceIdSchema = z.string().regex(/^[a-zA-Z0-9]{16}$/)
const validateResourceId = (data: unknown) =>
	resourceIdSchema.safeParse(data).success

export default validateResourceId
