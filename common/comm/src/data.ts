import { z } from 'zod'

export type Data<T> = Omit<T, 'id' | 'metaId'>

export const dataSchema = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) => {
	return schema.omit({ id: true, metaId: true })
}
