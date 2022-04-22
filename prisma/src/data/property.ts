import { z } from 'zod'
import { propertySchema } from '../generated'

export const propertyDataSchema = propertySchema.omit({ id: true, metaId: true })

export type PropertyData = z.TypeOf<typeof propertyDataSchema>
