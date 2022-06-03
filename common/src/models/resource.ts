import { ObjectId } from 'mongodb'
import { z } from 'zod'
import { Meta, metaSchema, newMeta } from './meta'

export const resourceShapeSchema = <
	D extends z.AnyZodObject,
	M extends z.AnyZodObject = z.ZodObject<{}, 'passthrough'>
>(
	dataSchema: D,
	metaExtensionSchema: M = z.object({}) as M
) =>
	z.object({
		id: z.string(),
		meta: metaSchema(metaExtensionSchema),
		data: dataSchema,
	})

export interface ResourceShape<D extends {}, M extends {} | undefined = undefined> {
	id: string
	meta: Meta<M>
	data: D
}

type ResourceConstructorData<
	D extends {},
	E extends {} | undefined = undefined
> = E extends undefined
	? {
			id?: string
			meta?: Partial<Meta<E>> & E
			data: D
	  }
	: {
			id?: string
			meta: Partial<Meta<E>> & E
			data: D
	  }

export class Resource<D extends {}, M extends {} | undefined = undefined>
	implements ResourceShape<D, M>
{
	readonly id: string
	readonly meta: Meta<M>
	private _data: D

	get data() {
		return this._data
	}

	constructor({ id, meta, data }: ResourceConstructorData<D, M>) {
		this.id = id ?? new ObjectId().toString()
		this.meta = newMeta(meta) as Meta<M>
		this._data = data
	}

	toBson() {
		return {
			id: new ObjectId(this.id),
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
	type Data = z.TypeOf<D>
	type MetaExtensionShape = M extends z.AnyZodObject
		? M
		: z.ZodObject<{}, 'passthrough'>
	type MetaExtension = M extends z.AnyZodObject
		? z.TypeOf<MetaExtensionShape>
		: undefined

	return z.preprocess((value) => {
		if (value instanceof Resource) return value

		const resourceParseResult = resourceShapeSchema(
			dataSchema,
			metaExtensionSchema
		).safeParse(value)
		if (resourceParseResult.success)
			return new Resource(
				resourceParseResult.data as ResourceConstructorData<Data, MetaExtension>
			)

		const dataParseResult = dataSchema.safeParse(value)
		if (dataParseResult.success) return new Resource({ data: dataParseResult.data })

		return value
	}, z.instanceof<new (_: ResourceConstructorData<Data, MetaExtension>) => Resource<Data, MetaExtension>>(Resource))
}