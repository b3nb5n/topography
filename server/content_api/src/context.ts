import { z } from 'zod'
import { ResourceType } from './models/resource'

export const contextSchema = z.object({
	resourceType: z.nativeEnum(ResourceType),
})

export type Context = z.TypeOf<typeof contextSchema>
