import { Response } from '@topography/common'
import { RequestHandler } from 'express'
import { ObjectId } from 'mongodb'
import { HandlerContext } from '../..'

export type DeleteRoleResponse = Response

interface DeleteRoleParams {
	id: string
}

export const deleteRoleHandler = (
	ctx: HandlerContext
): RequestHandler<DeleteRoleParams, DeleteRoleResponse> => {
	return async (req, res) => {
		const _id = new ObjectId(req.params.id)

		try {
			await ctx.db.roles.deleteOne({ _id })
			return res.send({})
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
} 