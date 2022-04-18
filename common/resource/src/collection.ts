import { ResourceType } from './meta'
import { Resource } from './resource'

export interface CollectionData {
	name: string
	schema: {}
}

export type Collection = Resource<ResourceType.collection, CollectionData>
