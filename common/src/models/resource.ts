import { ObjectId } from 'mongodb'
import { z } from 'zod'
import { Meta, metaShapeSchema } from './meta'
import { objectIdSchema } from './object-id'

const baseResourceShapeSchema = z.object({
	_id: objectIdSchema,
	meta: metaShapeSchema,
})

export const resourceShapeSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
	baseResourceShapeSchema.extend({ data: dataSchema })

export type ResourceShape<T> = z.TypeOf<typeof baseResourceShapeSchema> & {
	data: T
}

type ResourceConstructorData<T> = Pick<ResourceShape<T>, 'data'> &
	Partial<ResourceShape<T>>

export class Resource<T> implements ResourceShape<T> {
	readonly _id: ObjectId
	readonly meta: Meta
	private _data: T

	get id() {
		return this._id.toString()
	}

	get data() {
		return this._data
	}

	set data(value: T) {
		this.meta.edited = new Date(Date.now())
		this._data = value
	}

	constructor({ _id, meta, data }: ResourceConstructorData<T>) {
		this._id = _id ?? new ObjectId()
		this.meta = new Meta(meta)
		this._data = data
	}

	toBson(): ResourceShape<T> {
		return {
			_id: this._id,
			meta: this.meta.toBson(),
			data: this._data,
		}
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
