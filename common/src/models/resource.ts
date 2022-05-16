import { ObjectId } from 'mongodb'
import { z } from 'zod'
import { Meta, metaSchema, newMeta } from './meta'
import { objectIdSchema } from './object-id'

export const resourceShapeSchema = <
	DataSchema extends z.AnyZodObject,
	ExtensionSchema extends z.AnyZodObject
>(
	dataSchema: DataSchema,
	metaExtensionSchema: ExtensionSchema
) =>
	z.object({
		_id: objectIdSchema,
		meta: metaSchema(metaExtensionSchema),
		data: dataSchema,
	})

export interface ResourceShape<
	Data extends {},
	Extension extends {} | undefined = undefined
> {
	_id: ObjectId
	meta: Meta<Extension>
	data: Data
}

type ResourceConstructorData<
	Data extends {},
	Extension extends {} | undefined = undefined
> = Extension extends undefined
	? {
			_id?: ObjectId
			meta?: Partial<Meta<Extension>> & Extension
			data: Data
	  }
	: {
			_id?: ObjectId
			meta: Partial<Meta<Extension>> & Extension
			data: Data
	  }

export class Resource<Data extends {}, Extension extends {} | undefined = undefined>
	implements ResourceShape<Data, Extension>
{
	readonly _id: ObjectId
	readonly meta: Meta<Extension>
	private _data: Data

	get id() {
		return this._id.toString()
	}

	get data() {
		return this._data
	}

	set data(value: Data) {
		this.meta.edited = new Date(Date.now())
		this._data = value
	}

	constructor({ _id, meta, data }: ResourceConstructorData<Data, Extension>) {
		this._id = _id ?? new ObjectId()
		this.meta = newMeta(meta) as Meta<Extension>
		this._data = data
	}

	toBson(): ResourceShape<Data, Extension> {
		return {
			_id: this._id,
			meta: this.meta,
			data: this._data,
		}
	}
}

export const resourceSchema = <
	DataSchema extends z.AnyZodObject,
	ExtensionSchema extends z.AnyZodObject
>(
	dataSchema: DataSchema,
	metaExtensionSchema: ExtensionSchema
) =>
	z.preprocess((value) => {
		if (value instanceof Resource) return value

		const resourceParseResult = resourceShapeSchema(
			dataSchema,
			metaExtensionSchema
		).safeParse(value)
		if (resourceParseResult.success) return resourceParseResult.data

		const dataParseResult = dataSchema.safeParse(value)
		if (dataParseResult.success) return dataParseResult.success

		return value
	}, z.instanceof<new (_: ResourceConstructorData<z.TypeOf<DataSchema>, z.TypeOf<ExtensionSchema>>) => Resource<z.TypeOf<DataSchema>, z.TypeOf<ExtensionSchema>>>(Resource))
