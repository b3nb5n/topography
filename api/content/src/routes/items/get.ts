import { GetResourceResponse } from '@topography/api'
import { ERRORS } from '@topography/common'
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
			const collectionId = new ObjectId(req.params.collectionId)
			const [collection, items] = await Promise.all([
				db.collections.findOne({ _id: collectionId }),
				db.items.find({ 'meta.collection': collectionId }).toArray(),
			])

			if (!collection) return res.status(404).send({ error: ERRORS.NOT_FOUND })
			return res.send({ data: items })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}

export default getItemsHandler
