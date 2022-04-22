import { z } from 'zod'
import { roleSchema } from '../generated'

export const roleDataSchema = roleSchema.omit({ id: true })

export type RoleData = z.TypeOf<typeof roleDataSchema>
