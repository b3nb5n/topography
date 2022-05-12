import {
	Meta,
	Resource,
	ResourceConstructorData,
	resourceSchema,
} from '@topography/common'
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'
import { z } from 'zod'

export const roleDataSchema = z.object({
	name: z.string(),
})

export const roleSchema = resourceSchema(roleDataSchema)

type RoleDataShape = z.TypeOf<typeof roleDataSchema>
export class RoleData implements RoleDataShape {
	@Column()
	name: string

	constructor({ name }: RoleDataShape) {
		this.name = name
	}
}

@Entity()
export class Role implements Resource<RoleData> {
	@ObjectIdColumn()
	id: ObjectID

	@Column((_type) => Meta)
	meta: Meta

	@Column((_type) => RoleData)
	data: RoleData

	constructor({ id, meta, data }: ResourceConstructorData<RoleData>) {
		this.id = id ?? new ObjectID()
		this.meta = meta ?? new Meta()
		this.data = data
	}
}
