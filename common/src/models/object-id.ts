import { ObjectId } from 'mongodb'
import { z } from 'zod'

export const objectIdSchema = z.preprocess((value) => {
	if (value instanceof ObjectId) return value
	if (typeof value === 'string' && /^[0-9a-f]{24}$/i.test(value))
		return new ObjectId(value)

	return value
}, z.instanceof(ObjectId))
