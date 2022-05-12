import { DataSource } from 'typeorm'
import { Invitation, Role, User } from './entities'

const dataSource = new DataSource({
	type: 'mongodb',
	host: 'localhost',
	port: 27017,
	database: 'auth',
	synchronize: true,
	logging: true,
	entities: [Invitation, Role, User],
})

export const invitationRepository = dataSource.getMongoRepository(Invitation)
export const roleRepository = dataSource.getMongoRepository(Role)
export const userRepository = dataSource.getMongoRepository(User)

export default dataSource
