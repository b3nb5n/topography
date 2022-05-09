import { z } from 'zod'

export enum Visibility {
	live,
	draft,
	archived,
	deleted,
}

export const metaSchema = z.object({
	created: z.date(),
	edited: z.date(),
	visibility: z.nativeEnum(Visibility),
})

export type MetaShape = z.TypeOf<typeof metaSchema>

class Meta implements MetaShape {
	readonly created: Date
	edited: Date
	visibility: Visibility

	constructor(json?: Partial<MetaShape>) {
		const { created, edited, visibility } = {
			created: new Date(Date.now()),
			edited: new Date(Date.now()),
			visibility: Visibility.live,
			...json,
		}

		this.created = created
		this.edited = edited
		this.visibility = visibility
	}
}

export default Meta
