import { extendShape, z } from 'zod'

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

export const metaSchema = <
	ExtensionSchema extends z.AnyZodObject | undefined = undefined
>(
	extensionSchema?: ExtensionSchema
): ExtensionSchema extends z.AnyZodObject
	? z.ZodObject<
			extendShape<typeof baseMetaSchema['_shape'], ExtensionSchema['_shape']>,
			ExtensionSchema['_unknownKeys'],
			ExtensionSchema['_catchall']
	  >
	: typeof baseMetaSchema =>
	extensionSchema ? baseMetaSchema.merge(extensionSchema) : (baseMetaSchema as any)

export type Meta<Extension extends {} | undefined = undefined> =
	Extension extends {}
		? Extension & z.TypeOf<typeof baseMetaSchema>
		: z.TypeOf<typeof baseMetaSchema>

type MetaConstructorData<Extension extends {} | undefined = undefined> =
	Extension extends {}
		? Partial<Meta<Extension>> & Extension
		: Partial<Meta> | undefined

export const newMeta = <Extension extends {} | undefined = undefined>(
	data: MetaConstructorData<Extension>
) =>
	({
		created: data?.created ?? new Date(Date.now()),
		edited: data?.edited ?? new Date(Date.now()),
		visibility: data?.visibility ?? Visibility.live,
		...data,
	} as Meta<Extension>)
