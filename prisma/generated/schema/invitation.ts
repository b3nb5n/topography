import * as z from "zod"

export const invitationSchema = z.object({
  id: z.string(),
  email: z.string(),
  roleId: z.string(),
})
