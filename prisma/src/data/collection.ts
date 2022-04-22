import { z } from 'zod'
import { collectionSchema } from '../generated'

export const collectionDataSchema = collectionSchema.omit({
	id: true,
	metaId: true,
})

export type CollectionData = z.TypeOf<typeof collectionDataSchema>
