import _ from 'lodash'

export enum Visibility {
	live,
	draft,
	archived,
	deleted,
}

interface ResourceMetaJSON {
	created: string
	edited: string
	visibility: Visibility
}

class ResourceMeta {
	created: Date
	edited: Date
	visibility: Visibility

	constructor() {
		const now = Date.now()
		this.created = new Date(now)
		this.edited = new Date(now)
		this.visibility = Visibility.live
	}

	static fromJSON(json: ResourceMetaJSON): ResourceMeta {
		const meta = new ResourceMeta()

		meta.created = new Date(Date.parse(json.created))
		meta.edited = new Date(Date.parse(json.edited))
		meta.visibility = json.visibility

		return meta
	}

	toJSON(): ResourceMetaJSON {
		return {
			created: this.created.toUTCString(),
			edited: this.edited.toUTCString(),
			visibility: this.visibility,
		}
	}
}

export type resourceData = {}

type DeepPartial<T> = T extends object
	? {
			[K in keyof T]?: DeepPartial<T[K]>
	  }
	: T

export class Resource<T extends resourceData> {
	readonly id?: string
	readonly meta: ResourceMeta
	private _data: T

	get data(): T {
		return this._data
	}

	constructor(data: T) {
		this.meta = new ResourceMeta()
		this._data = data
	}

	setVisibility(value: Visibility) {
		this.meta.visibility = value
	}

	updateData(data: DeepPartial<T>) {
		this._data = _.merge(this._data, data)
		this.meta.edited = new Date(Date.now())
	}
}
