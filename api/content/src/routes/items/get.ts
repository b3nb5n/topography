import { GetResourceResponse } from '@topography/api'
import { RequestHandler } from 'express'
import { ObjectId } from 'mongodb'
import { ItemsHandlerContext, ItemsHandlerParams } from '.'

const getItemsHandler = ({
	db,
}: ItemsHandlerContext): RequestHandler<
	ItemsHandlerParams,
	GetResourceResponse<any>
> => {
	return async (req, res) => {
		try {
			const collection = new ObjectId(req.params.collectionId)
			const items = await db.items.find({ 'meta.collection': collection }).toArray()

			return res.send({ data: items })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}

export default getItemsHandler
