import lodash from 'lodash'
import { ResourceMeta, ResourceMetaJSON, ResourceType } from './meta'

export interface ResourceJson<T extends ResourceType, D> {
	id?: string
	meta: ResourceMetaJSON<T>
	data: D
}

type DeepPartial<T> = T extends object
	? {
			[K in keyof T]?: DeepPartial<T[K]>
	  }
	: T

export class Resource<T extends ResourceType, D> {
	readonly id?: string
	private _data: D
	meta: ResourceMeta<T>

	get data(): D {
		return this._data
	}

	constructor(type: T, data: D) {
		this.meta = new ResourceMeta(type)
		this._data = data
	}

	static fromJSON<T extends ResourceType, D>(json: ResourceJson<T, D>): Resource<T, D> {
		const resource = new Resource<T, D>(json.meta.type, json.data)
		resource.meta = ResourceMeta.fromJSON(json.meta)
		return resource
	}

	toJSON = (): ResourceJson<T, D> => ({
		id: this.id,
		meta: this.meta.toJSON(),
		data: this._data,
	})

	setData(data: D) {
		this._data = data
		this.meta.edited = new Date(Date.now())
	}

	updateData(data: DeepPartial<D>) {
		this._data = lodash.merge(this._data, data)
		this.meta.edited = new Date(Date.now())
	}
}
