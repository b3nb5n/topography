import { ObjectId } from 'mongodb'
import { z } from 'zod'
import { objectIdSchema } from '../schemas'
import { Meta, metaSchema } from './meta'

const baseResourceSchema = z.object({
	id: objectIdSchema,
	meta: metaSchema,
})

export const resourceShapeSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
	baseResourceSchema.extend({ data: dataSchema })

export type ResourceShape<T> = z.TypeOf<typeof baseResourceSchema> & { data: T }
type ResourceConstructorData<T> = Pick<ResourceShape<T>, 'data'> &
	Partial<ResourceShape<T>>

export class Resource<T> implements ResourceShape<T> {
	readonly id: ObjectId
	readonly meta: Meta
	private _data: T

	get data() {
		return this._data
	}

	set data(value: T) {
		this.meta.edited = new Date(Date.now())
		this._data = value
	}

	constructor({ id, meta, data }: ResourceConstructorData<T>) {
		this.id = id ?? new ObjectId()
		this.meta = meta ?? new Meta()
		this._data = data
	}
}

export const resourceSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
	z.preprocess((value) => {
		if (value instanceof Resource) return value

		const resourceParseResult = resourceShapeSchema(dataSchema).safeParse(value)
		if (resourceParseResult.success) return resourceParseResult.data

		const dataParseResult = dataSchema.safeParse(value)
		if (dataParseResult.success) return dataParseResult.success

		return value
	}, z.instanceof<new (_: ResourceConstructorData<z.TypeOf<T>>) => Resource<z.TypeOf<T>>>(Resource))
