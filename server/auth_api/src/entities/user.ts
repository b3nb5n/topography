import {
	Meta,
	objectIdSchema,
	Resource,
	ResourceConstructorData,
	resourceSchema,
} from '@topography/common'
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'
import { string, z } from 'zod'

export const userDataSchema = z.object({
	roleId: objectIdSchema,
	firstName: z.string(),
	lastName: string(),
	email: z.string().email(),
	password: z.string(),
})

export const userSchema = resourceSchema(userDataSchema)

type UserDataShape = z.TypeOf<typeof userDataSchema>
export class UserData implements UserDataShape {
	@Column()
	roleId: ObjectID

	@Column()
	firstName: string

	@Column()
	lastName: string

	@Column()
	email: string

	@Column()
	password: string

	constructor({ roleId, firstName, lastName, email, password }: UserDataShape) {
		this.roleId = roleId
		this.firstName = firstName
		this.lastName = lastName
		this.email = email
		this.password = password
	}
}

@Entity()
export class User implements Resource<UserData> {
	@ObjectIdColumn()
	id: ObjectID

	@Column((_type) => Meta)
	meta: Meta

	@Column((_type) => UserData)
	data: UserData

	constructor({ id, meta, data }: ResourceConstructorData<UserData>) {
		this.id = id ?? new ObjectID()
		this.meta = meta ?? new Meta()
		this.data = data
	}
}
