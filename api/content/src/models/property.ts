import { z } from 'zod'

export const propertyDataSchema = z.object({
	name: z.string(),
	hosts: z.array(z.string()),
})

export type PropertyData = z.TypeOf<typeof propertyDataSchema>
