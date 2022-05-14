import {
	objectIdSchema,
	resourceSchema,
	resourceShapeSchema,
} from '@topography/common'
import { string, z } from 'zod'

export const userDataSchema = z.object({
	roleId: objectIdSchema,
	firstName: z.string(),
	lastName: string(),
	email: z.string().email(),
	password: z.string(),
})

export const userShapeSchema = resourceShapeSchema(userDataSchema)
export const userSchema = resourceSchema(userDataSchema)

export type UserData = z.TypeOf<typeof userDataSchema>
export type UserShape = z.TypeOf<typeof userShapeSchema>
export type User = z.TypeOf<typeof userSchema>
