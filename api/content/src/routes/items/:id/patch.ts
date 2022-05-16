import { ERRORS, Response } from '@topography/common'
import { RequestHandler } from 'express'
import { ObjectId } from 'mongodb'
import { ItemHandlerContext, ItemHandlerParams } from '.'

export type PatchResourceResponse = Response

export const patchResource = ({
	db,
}: ItemHandlerContext): RequestHandler<
	ItemHandlerParams,
	PatchResourceResponse
> => {
	return async (req, res) => {
		try {
			const _id = new ObjectId(req.params.id)
			const collectionId = new ObjectId(req.params.collectionId)
			const collection = await db.collections.findOne({ _id: collectionId })
			if (!collection) return res.status(404).send({ error: ERRORS.MISSING_ID })

			// TODO: get the collection item schema and validate request body against it

			await db.items.updateOne({ _id }, { data: req.body })
			return res.send({})
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}
