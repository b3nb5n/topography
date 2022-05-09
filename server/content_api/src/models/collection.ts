import { z } from 'zod'

export const collectionDataSchema = z.object({
	name: z.string(),
	schema: z.object({}).passthrough(),
})

export type CollectionData = z.TypeOf<typeof collectionDataSchema>
