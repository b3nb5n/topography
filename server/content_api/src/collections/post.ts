import { Resource, ResourceType } from '@topography/resource'
import { Request, Response } from 'express'
import { Collection, collectionDataSchema } from './collection'

const postCollection = async (req: Request, res: Response) => {
	const parseResult = await collectionDataSchema.safeParseAsync(req.body)
	if (!parseResult.success) return res.sendStatus(400)

	// TODO: authenticate request sender

	const { property: propertyID } = req.params
	const collection: Collection = new Resource(ResourceType.collection, parseResult.data)

	// TODO: add the collection to the database

	return res.sendStatus(201)
}

export default postCollection
