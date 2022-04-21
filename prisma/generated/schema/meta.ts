import * as z from "zod"
import { ResourceType, Visibility } from "@prisma/client"

export const metaSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(ResourceType),
  created: z.date(),
  edited: z.date(),
  visibility: z.nativeEnum(Visibility),
})
