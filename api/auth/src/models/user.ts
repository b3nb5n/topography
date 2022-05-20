import {
	objectIdSchema,
	resourceSchema,
	resourceShapeSchema,
} from '@topography/common'
import { string, z } from 'zod'

export const userDataSchema = z.object({
	firstName: z.string(),
	lastName: string(),
	email: z.string().email(),
	password: z.string(),
})

export const userMetaExtensionSchema = z.object({
	roleId: objectIdSchema,
})

export const userShapeSchema = resourceShapeSchema(
	userDataSchema,
	userMetaExtensionSchema
)
export const userSchema = resourceSchema(userDataSchema, userMetaExtensionSchema)

export type UserData = z.TypeOf<typeof userDataSchema>
export type UserShape = z.TypeOf<typeof userShapeSchema>
export type User = z.TypeOf<typeof userSchema>
