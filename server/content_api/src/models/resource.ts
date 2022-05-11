import { uid } from 'uid'
import { z } from 'zod'
import Meta, { metaSchema } from './meta'

const baseResourceSchema = z.object({
	id: z.string(),
	meta: metaSchema,
})

export const resourceSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
	baseResourceSchema.merge(z.object({ data: dataSchema }))

export type ResourceShape<T> = z.TypeOf<typeof baseResourceSchema> & { data: T }

class Resource<T> implements ResourceShape<T> {
	id: string
	meta: Meta
	data: T

	constructor({
		id = uid(16),
		meta = new Meta(),
		data,
	}: Omit<ResourceShape<T>, 'id' | 'meta'> &
		Partial<Pick<ResourceShape<T>, 'id' | 'meta'>>) {
		this.id = id
		this.meta = meta
		this.data = data
	}
}

export default Resource
