import { z } from 'zod'
import { idSchema } from './content'

export const roleSchema = z.object({
	id: idSchema,
	name: z.string(),
})

export const invitationSchema = z.object({
	id: idSchema,
	email: z.string().email(),
	roleId: idSchema,
})

export const userSchema = z.object({
	id: idSchema,
	roleId: idSchema,
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email(),
	password: z.string(),
})
