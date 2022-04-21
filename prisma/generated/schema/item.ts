import * as z from "zod"

export const itemSchema = z.object({
  id: z.string(),
  metaId: z.string(),
  collectionId: z.string(),
})
