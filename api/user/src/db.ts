import { MongoClient } from 'mongodb'
import { InvitationShape, RoleShape, UserShape } from './models'

const connectDB = async () => {
	const client = new MongoClient('mongodb://localhost:27017')
	await client.connect()
	const db = client.db('auth')

	return {
		invitations: db.collection<InvitationShape>('invitations'),
		roles: db.collection<RoleShape>('roles'),
		users: db.collection<UserShape>('users'),
	}
}

export type DB = Awaited<ReturnType<typeof connectDB>>

export default connectDB
