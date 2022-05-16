import { MongoClient } from 'mongodb'
import { CollectionShape, PropertyShape } from './models'
import { ItemShape } from './models/item'

const connectDB = async () => {
	const client = new MongoClient('mongodb://localhost:27017')
	await client.connect()
	const db = client.db('content')

	return {
		properties: db.collection<PropertyShape>('properties'),
		collections: db.collection<CollectionShape>('collections'),
		items: db.collection<ItemShape<any>>('items'),
	}
}

export type DB = Awaited<ReturnType<typeof connectDB>>

export default connectDB
