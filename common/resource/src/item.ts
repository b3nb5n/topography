import { ResourceType } from './meta'
import { Resource } from './resource'

export type ItemData<T> = T

export type Item<T> = Resource<ResourceType.item, ItemData<T>>
