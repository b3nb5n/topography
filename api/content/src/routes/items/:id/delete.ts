import { DeleteResourceResponse } from '@topography/api'
import { RequestHandler } from 'express'
import { ObjectId } from 'mongodb'
import { ItemHandlerContext, ItemHandlerParams } from '.'

const deleteItemHandler = ({
	db,
}: ItemHandlerContext): RequestHandler<
	ItemHandlerParams,
	DeleteResourceResponse
> => {
	return async (req, res) => {
		try {
			const _id = new ObjectId(req.params.id)
			await db.items.deleteOne({ _id })
			return res.status(200).send({})
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}

export default deleteItemHandler
