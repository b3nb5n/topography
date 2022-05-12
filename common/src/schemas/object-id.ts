import { ObjectID } from 'typeorm'
import { z } from 'zod'

export const objectIdSchema = z.preprocess(
	(value) => new ObjectID(value as any),
	z.instanceof(ObjectID)
)
