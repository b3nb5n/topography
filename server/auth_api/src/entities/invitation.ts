import {
	Meta,
	objectIdSchema,
	Resource,
	ResourceConstructorData,
	resourceSchema,
} from '@topography/common'
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'
import { z } from 'zod'

export const invitationDataSchema = z.object({
	email: z.string().email(),
	roleId: objectIdSchema,
})

export const invitationSchema = resourceSchema(invitationDataSchema)

type InvitationDataShape = z.TypeOf<typeof invitationDataSchema>
export class InvitationData implements InvitationDataShape {
	@Column()
	email: string

	@Column()
	roleId: ObjectID

	constructor({ email, roleId }: InvitationDataShape) {
		this.email = email
		this.roleId = roleId
	}
}

@Entity()
export class Invitation implements Resource<InvitationData> {
	@ObjectIdColumn()
	id: ObjectID

	@Column((_type) => Meta)
	meta: Meta

	@Column((_type) => InvitationData)
	data: InvitationData

	constructor({ id, meta, data }: ResourceConstructorData<InvitationData>) {
		this.id = id ?? new ObjectID()
		this.meta = meta ?? new Meta()
		this.data = data
	}
}
