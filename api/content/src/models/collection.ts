import { resourceSchema, resourceShapeSchema } from '@topography/common'
import { z } from 'zod'

export const collectionDataSchema = z.object({
	name: z.string(),
	schema: z.object({}).passthrough(),
})

export const collectionMetaExtensionSchema = z.object({})

export const collectionShapeSchema = resourceShapeSchema(
	collectionDataSchema,
	collectionMetaExtensionSchema
)

export const collectionSchema = resourceSchema(
	collectionDataSchema,
	collectionMetaExtensionSchema
)

export type CollectionMetaExtension = z.TypeOf<typeof collectionMetaExtensionSchema>
export type CollectionData = z.TypeOf<typeof collectionDataSchema>
export type CollectionShape = z.TypeOf<typeof collectionShapeSchema>
export type Collection = z.TypeOf<typeof collectionSchema>
