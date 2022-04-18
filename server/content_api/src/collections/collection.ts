import { Resource, ResourceType } from '@topography/resource'
import { z } from 'zod'

export const collectionDataSchema = z.object({
	name: z.string(),
	schema: z.object({}),
})

export type CollectionData = z.TypeOf<typeof collectionDataSchema>

export type Collection = Resource<ResourceType.collection, CollectionData>
