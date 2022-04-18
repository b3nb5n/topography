import { Request, Response } from 'express'
import { Collection } from '../collection'

export interface GetCollectionResponse {
	data: Collection
}

const getCollection = (req: Request, res: Response<GetCollectionResponse>) => {
	const { property: propertyID, collection: collectionID } = req.params
	if (!propertyID || !collectionID) return res.sendStatus(400)

	// TODO: get the collection from the database

	// return res.send({ data: collection })
}

export default getCollection
