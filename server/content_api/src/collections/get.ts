import { Request, Response } from 'express'
import { Collection } from './collection'

export interface GetCollectionsResponse {
	data: Collection[]
}

const getCollections = (req: Request, res: Response<GetCollectionsResponse>) => {
	const { collection: collectionID } = req.params
	if (!collectionID) return res.sendStatus(400)

	// TODO: get collections from the database

	return res.status(200).send({ data: [] })
}

export default getCollections
