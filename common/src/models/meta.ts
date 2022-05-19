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

export const metaSchema = <E extends z.AnyZodObject | undefined = undefined>(
	extensionSchema?: E
): E extends z.AnyZodObject
	? z.ZodObject<
			extendShape<typeof baseMetaSchema['_shape'], E['_shape']>,
			E['_unknownKeys'],
			E['_catchall']
	  >
	: typeof baseMetaSchema =>
	extensionSchema ? baseMetaSchema.merge(extensionSchema) : (baseMetaSchema as any)

export type Meta<E extends {} | undefined = undefined> = E extends {}
	? E & z.TypeOf<typeof baseMetaSchema>
	: z.TypeOf<typeof baseMetaSchema>

type MetaConstructorData<E extends {} | undefined = undefined> = E extends {}
	? Partial<Meta<E>> & E
	: Partial<Meta> | undefined

export const newMeta = <E extends {} | undefined = undefined>(
	data: MetaConstructorData<E>
) =>
	({
		created: data?.created ?? new Date(Date.now()),
		edited: data?.edited ?? new Date(Date.now()),
		visibility: data?.visibility ?? Visibility.live,
		...data,
	} as Meta<E>)
