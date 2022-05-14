import { Response } from '@topography/common'
import { RequestHandler } from 'express'
import { HandlerContext } from '../..'

export type DeleteUserResponse = Response

interface DeleteUserParams {
	id: string
}

export const deleteUserHandler = (
	ctx: HandlerContext
): RequestHandler<DeleteUserParams, DeleteUserResponse> => {
	return async (req, res) => {
		let { id } = req.params
		// local variable `payload` set by `authenticate` middleware.
		if (id === 'me') id = res.locals.payload.uid

		try {
			const result = await ctx.db.users.deleteOne({ id })
			if (!result.deletedCount) return res.status(404).send({})
			return res.send({})
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
} 