import { ObjectId } from 'mongodb'
import { z } from 'zod'
import { Meta, metaSchema, newMeta } from './meta'
import { objectIdSchema } from './object-id'

export const resourceShapeSchema = <
	D extends z.AnyZodObject,
	M extends z.AnyZodObject = z.ZodObject<{}, 'passthrough'>
>(
	dataSchema: D,
	metaExtensionSchema: M = z.object({}) as M
) =>
	z.object({
		_id: objectIdSchema,
		meta: metaSchema(metaExtensionSchema),
		data: dataSchema,
	})

export interface ResourceShape<D extends {}, M extends {} | undefined = undefined> {
	_id: ObjectId
	meta: Meta<M>
	data: D
}

type ResourceConstructorData<
	D extends {},
	E extends {} | undefined = undefined
> = E extends undefined
	? {
			_id?: ObjectId
			meta?: Partial<Meta<E>> & E
			data: D
	  }
	: {
			_id?: ObjectId
			meta: Partial<Meta<E>> & E
			data: D
	  }

export class Resource<D extends {}, M extends {} | undefined = undefined>
	implements ResourceShape<D, M>
{
	readonly _id: ObjectId
	readonly meta: Meta<M>
	private _data: D

	get id() {
		return this._id.toString()
	}

	get data() {
		return this._data
	}

	constructor({ _id, meta, data }: ResourceConstructorData<D, M>) {
		this._id = _id ?? new ObjectId()
		this.meta = newMeta(meta) as Meta<M>
		this._data = data
	}

	toBson(): ResourceShape<D, M> {
		return {
			_id: this._id,
			meta: this.meta,
			data: this._data,
		}
	}

	update(data: Partial<D>) {
		this._data = { ...this._data, ...data }
		this.meta.edited.setTime(Date.now())
	}
}

export const resourceSchema = <
	D extends z.AnyZodObject,
	M extends z.AnyZodObject | undefined = undefined
>(
	dataSchema: D,
	metaExtensionSchema?: M
) => {
	type MetaExtension = M extends z.AnyZodObject ? M : z.ZodObject<{}, 'passthrough'>
	type MetaExtensionShape = M extends z.AnyZodObject
		? z.TypeOf<MetaExtension>
		: undefined

	return z.preprocess((value) => {
		if (value instanceof Resource) return value

		const resourceParseResult = resourceShapeSchema(
			dataSchema,
			metaExtensionSchema
		).safeParse(value)
		if (resourceParseResult.success) return resourceParseResult.data

		const dataParseResult = dataSchema.safeParse(value)
		if (dataParseResult.success) return dataParseResult.success

		return value
	}, z.instanceof<new (_: ResourceConstructorData<z.TypeOf<D>, MetaExtensionShape>) => Resource<z.TypeOf<D>, MetaExtensionShape>>(Resource))
}