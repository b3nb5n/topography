import { Column } from 'typeorm'
import { z } from 'zod'

export enum Visibility {
	live,
	draft,
	archived,
	deleted,
}

export const metaDataSchema = z.object({
	created: z.date(),
	edited: z.date(),
	visibility: z.nativeEnum(Visibility),
})

export type MetaData = z.TypeOf<typeof metaDataSchema>

export class Meta implements MetaData {
	@Column('datetime')
	created: Date

	@Column('datetime')
	edited: Date

	@Column('int')
	visibility: Visibility

	constructor(json?: Partial<MetaData>) {
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

	toJson(): MetaData {
		return {
			created: this.created,
			edited: this.edited,
			visibility: this.visibility,
		}
	}
}

export const metaSchema = z.preprocess((value) => {
	if (value instanceof Meta) return value
	return new Meta(metaDataSchema.parse(value))
}, z.instanceof(Meta))
