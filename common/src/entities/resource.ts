import { ObjectID } from 'typeorm'
import { z } from 'zod'
import { metaSchema } from './meta'

const baseResourceSchema = z.object({
	id: z.preprocess((value) => {
		if (value instanceof ObjectID) return value
		return new ObjectID(value as any)
	}, z.instanceof(ObjectID)),
	meta: metaSchema,
})

export const resourceSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
	baseResourceSchema.merge(z.object({ data: dataSchema }))

export type Resource<T> = z.TypeOf<typeof baseResourceSchema> & { data: T }

export type ResourceConstructorData<T> = Pick<Resource<T>, 'data'> &
	Partial<Resource<T>>
