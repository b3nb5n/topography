import { z } from 'zod'
import { itemSchema } from '../generated'

export const itemDataSchema = itemSchema.pick({})

export type ItemData = z.TypeOf<typeof itemDataSchema>
