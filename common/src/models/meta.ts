import { z } from 'zod'

export enum Visibility {
	live,
	draft,
	archived,
	deleted,
}

export const metaShapeSchema = z.object({
	created: z.date(),
	edited: z.date(),
	visibility: z.nativeEnum(Visibility),
})

export type MetaShape = z.TypeOf<typeof metaShapeSchema>

export class Meta implements MetaShape {
	created: Date
	edited: Date
	visibility: Visibility

	constructor(data: Partial<MetaShape> = {}) {
		const { created, edited, visibility } = data
		this.created = created ?? new Date(Date.now())
		this.edited = edited ?? new Date(Date.now())
		this.visibility = visibility ?? Visibility.live
	}
}

export const metaSchema = z.preprocess((value) => {
	if (value instanceof Meta) return value
	const parseResult = metaShapeSchema.safeParse(value)
	if (!parseResult.success) return value
	return new Meta(parseResult.data)
}, z.instanceof(Meta))
