import {
	objectIdSchema,
	Resource,
	resourceSchema,
	ResourceShape,
	resourceShapeSchema,
} from '@topography/common'
import { z } from 'zod'

export const itemMetaExtensionSchema = z.object({
	collection: objectIdSchema,
})

export const itemShapeSchema = <DataSchema extends z.AnyZodObject>(
	dataSchema: DataSchema
) => resourceShapeSchema(dataSchema, itemMetaExtensionSchema)

export const itemSchema = <DataSchema extends z.AnyZodObject>(
	dataSchema: DataSchema
) => resourceSchema(dataSchema, itemMetaExtensionSchema)

type ItemMetaExtension = z.TypeOf<typeof itemMetaExtensionSchema>
export type ItemShape<Data> = ResourceShape<Data, ItemMetaExtension>
export type Item<Data> = Resource<Data, ItemMetaExtension>
