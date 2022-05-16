import { Resource } from '@topography/common'
import { MongoClient } from 'mongodb'
import { CollectionData, PropertyData } from './models'

const connectDB = async () => {
	const client = new MongoClient('mongodb://localhost:27017')
	await client.connect()
	const db = client.db('content')

	return {
		properties: db.collection<PropertyData>('properties'),
		collections: db.collection<CollectionData>('collections'),
		items: db.collection<Resource<any>>('items'),
	}
}

export type DB = Awaited<ReturnType<typeof connectDB>>

export default connectDB
