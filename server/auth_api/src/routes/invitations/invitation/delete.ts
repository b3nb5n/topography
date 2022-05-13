import { ERRORS, Response } from '@topography/common'
import { RequestHandler } from 'express'
import { ObjectId } from 'mongodb'
import { HandlerContext } from '../..'

export type DeleteInvitationResponse = Response

interface DeleteInvitationParams {
	id: string
}

export const deleteInvitationHandler = (
	ctx: HandlerContext
): RequestHandler<DeleteInvitationParams, DeleteInvitationResponse> => {
	return async (req, res) => {
		const _id = new ObjectId(req.params.id)

		try {
			const result = await ctx.db.invitations.deleteOne({ _id })
			if (!result.deletedCount)
				return res.status(404).send({ error: ERRORS.NOT_FOUND })
			if (!result.acknowledged) throw ERRORS.UNKNOWN

			return res.send({})
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}
