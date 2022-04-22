import { z } from 'zod'
import { userSchema } from '../generated'

export const userDataSchema = userSchema.omit({ id: true })

export type UserData = z.TypeOf<typeof userDataSchema>
