import { PostResourceResponse } from '@topography/api'
import { ERRORS, Resource } from '@topography/common'
import { RequestHandler } from 'express'
import { ObjectId } from 'mongodb'
import { ItemsHandlerContext, ItemsHandlerParams } from '.'
import { Item } from '../../models/item'

export const postItemHandler = ({
	db,
}: ItemsHandlerContext): RequestHandler<
	ItemsHandlerParams,
	PostResourceResponse
> => {
	return async (req, res) => {
		try {
			const collectionId = new ObjectId(req.params.collectionId)
			const collection = await db.collections.findOne({ _id: collectionId })
			if (!collection) return res.status(404).send({ error: ERRORS.NOT_FOUND })
			// TODO: get the collection item schema and validate request body against it

			const item: Item<any> = new Resource({
				data: req.body,
				meta: { collection: collectionId },
			})

			await db.items.insertOne(item.toBson())
			return res.status(201).send({ data: { id: item.id } })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}

export default postItemHandler
