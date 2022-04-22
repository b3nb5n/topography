import { z } from 'zod'
import { metaSchema } from '../generated'

export const metaDataSchema = metaSchema.pick({ visibility: true })

export type MetaData = z.TypeOf<typeof metaDataSchema>
