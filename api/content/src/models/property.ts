import { resourceSchema, resourceShapeSchema } from '@topography/common'
import { z } from 'zod'

export const propertyDataSchema = z.object({
	name: z.string(),
	hosts: z.array(z.string()),
})

export const propertyShapeSchema = resourceShapeSchema(propertyDataSchema)
export const propertySchema = resourceSchema(propertyDataSchema)

export type PropertyData = z.TypeOf<typeof propertyDataSchema>
export type PropertyShape = z.TypeOf<typeof propertyShapeSchema>
export type Property = z.TypeOf<typeof propertySchema>
