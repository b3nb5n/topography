import * as z from "zod"

export const userSchema = z.object({
  id: z.string(),
  roleId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
})
