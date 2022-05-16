import { z } from 'zod'

export enum Visibility {
	live,
	draft,
	archived,
	deleted,
}

const baseMetaSchema = z.object({
	created: z.date(),
	edited: z.date(),
	visibility: z.nativeEnum(Visibility),
})

export const metaSchema = <ExtensionSchema extends z.AnyZodObject>(
	extensionSchema: ExtensionSchema
) => baseMetaSchema.merge(extensionSchema)

export type Meta<Extension extends {} = {}> = Extension &
	z.TypeOf<typeof baseMetaSchema>

export const newMeta = <T extends {}>(data: Partial<Meta<T>> & T) => {
	const { created, edited, visibility, ...extension } = data

	return {
		created: created ?? new Date(Date.now()),
		edited: edited ?? new Date(Date.now()),
		visibility: visibility ?? Visibility.live,
		...extension,
	}
}

