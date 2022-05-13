import {
	objectIdSchema,
	resourceSchema,
	resourceShapeSchema,
} from '@topography/common'
import { z } from 'zod'

export const invitationDataSchema = z.object({
	email: z.string().email(),
	roleId: objectIdSchema,
})

export const invitationShapeSchema = resourceShapeSchema(invitationDataSchema)
export const invitationSchema = resourceSchema(invitationDataSchema)

export type InvitationData = z.TypeOf<typeof invitationDataSchema>
export type InvitationShape = z.TypeOf<typeof invitationShapeSchema>
export type Invitation = z.TypeOf<typeof invitationSchema>