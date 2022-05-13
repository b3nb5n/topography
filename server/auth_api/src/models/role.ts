import { resourceSchema, resourceShapeSchema } from '@topography/common'
import { z } from 'zod'

export const roleDataSchema = z.object({
	name: z.string(),
})

export const roleShapeSchema = resourceShapeSchema(roleDataSchema)
export const roleSchema = resourceSchema(roleDataSchema)

export type RoleData = z.TypeOf<typeof roleDataSchema>
export type RoleShape = z.TypeOf<typeof roleShapeSchema>
export type Role = z.TypeOf<typeof roleSchema>
