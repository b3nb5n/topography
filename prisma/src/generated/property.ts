import * as z from "zod"

export const propertySchema = z.object({
  id: z.string(),
  metaId: z.string(),
  host: z.string().nullish(),
})
