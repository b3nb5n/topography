import { z } from 'zod'

type ExcludedKey = 'id' | `${string}Id`

export type Data<T> = { [K in keyof T]: K extends ExcludedKey ? never : T[K] }
export type PartialData<T> = T extends object
	? { [K in keyof T]?: K extends ExcludedKey ? never : PartialData<T[K]> }
	: T

export const dataSchema = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) => {
	const keyMask = Object.keys(schema.shape)
		.filter((key) => /^[a-z][a-z0-9]+Id$|^id$/gi.test(key))
		.reduce((keyMask, key) => ({ ...keyMask, [key]: true }), {})

	return schema.omit(keyMask)
}
