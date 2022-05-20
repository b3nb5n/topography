import { DeleteResourceResponse } from '@topography/api'
import { ERRORS } from '@topography/common'
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
			const collectionId = new ObjectId(req.params.collectionId)
			const _id = new ObjectId(req.params.id)
			const result = await db.items.deleteOne({
				_id,
				'meta.collection': collectionId,
			})

			if (!result.acknowledged) throw ERRORS.UNKNOWN
			if (!result.deletedCount)
				return res.status(404).send({ error: ERRORS.NOT_FOUND })

			return res.status(200).send({})
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}

export default deleteItemHandler
