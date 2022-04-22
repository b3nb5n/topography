import * as z from "zod"

export const roleSchema = z.object({
  id: z.string(),
  name: z.string(),
})
