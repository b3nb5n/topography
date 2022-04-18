export enum ResourceType {
	item,
	collection,
	property,
}

export enum Visibility {
	live,
	draft,
	archived,
	deleted,
}

export interface ResourceMetaJSON<T extends ResourceType> {
	created: string
	edited: string
	type: T
	visibility: Visibility
}

export class ResourceMeta<T extends ResourceType> {
	type: T
	created: Date
	edited: Date
	visibility: Visibility

	constructor(type: T) {
		const now = Date.now()

		this.type = type
		this.created = new Date(now)
		this.edited = new Date(now)
		this.visibility = Visibility.live
	}

	static fromJSON<T extends ResourceType>(json: ResourceMetaJSON<T>): ResourceMeta<T> {
		const meta = new ResourceMeta<T>(json.type)

		meta.created = new Date(Date.parse(json.created))
		meta.edited = new Date(Date.parse(json.edited))
		meta.visibility = json.visibility

		return meta
	}

	toJSON = (): ResourceMetaJSON<T> => ({
		type: this.type,
		created: this.created.toUTCString(),
		edited: this.edited.toUTCString(),
		visibility: this.visibility,
	})
}
