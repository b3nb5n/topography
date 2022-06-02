import { resourceSchema, resourceShapeSchema } from '@topography/common'
import { z } from 'zod'
import { accessSchema } from './access'

export const roleDataSchema = z.object({
	name: z.string(),
	permission: z.object({
		properties: z.object({
			create: z.boolean().optional(),
			access: z.record(
				z.object({
					resource: accessSchema,
					collections: accessSchema,
				})
			),
		}),
		collections: z.object({
			create: z.boolean().optional(),
			access: z.record(
				z.object({
					resource: accessSchema,
					items: accessSchema,
				})
			),
		}),
	}),
})

export const roleShapeSchema = resourceShapeSchema(roleDataSchema)
export const roleSchema = resourceSchema(roleDataSchema)

export type RoleData = z.TypeOf<typeof roleDataSchema>
export type RoleShape = z.TypeOf<typeof roleShapeSchema>
export type Role = z.TypeOf<typeof roleSchema>
