import { z } from 'zod'
import { invitationSchema } from '../generated'

export const invitationDataSchema = invitationSchema.omit({ id: true })

export type InvitationData = z.TypeOf<typeof invitationDataSchema>
