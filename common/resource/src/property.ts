import { ResourceType } from './meta'
import { Resource } from './resource'

export interface PropertyData {
	name: string
	hosts: string[]
}

export type Property = Resource<ResourceType.property, PropertyData>
