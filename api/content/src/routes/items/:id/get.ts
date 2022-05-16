import { GetResourceResponse } from '@topography/api'
import { ERRORS } from '@topography/common'
import { RequestHandler } from 'express'
import { ObjectId } from 'mongodb'
import { ItemHandlerContext, ItemHandlerParams } from '.'
import { ItemShape } from '../../../models/item'

export const getItemHandler = ({
	db,
}: ItemHandlerContext): RequestHandler<
	ItemHandlerParams,
	GetResourceResponse<ItemShape<any>>
> => {
	return async (req, res) => {
		try {
			const _id = new ObjectId(req.params.id)
			const collectionId = new ObjectId(req.params.collectionId)
			const item = await db.items.findOne({ _id, 'meta.collection': collectionId })
			if (!item) return res.status(404).send({ error: ERRORS.NOT_FOUND })
			return res.status(200).send({ data: item })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}

export default getItemHandler
