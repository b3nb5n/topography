import { ERRORS, Response } from '@topography/common'
import { RequestHandler } from 'express'
import { ObjectId } from 'mongodb'
import { HandlerContext } from '../..'
import { User, userSchema } from '../../../models'

export type GetUserResponse = Response<User>

interface GetUserParams {
	id: string
}

export const getUserHandler = (
	ctx: HandlerContext
): RequestHandler<GetUserParams, GetUserResponse> => {
	return async (req, res) => {
		let { id } = req.params
		// local variable `payload` set by `authenticate` middleware.
		if (id === 'me') id = res.locals.payload.uid

		try {
			const doc = await ctx.db.users.findOne({ _id: new ObjectId(id) })
			if (!doc) return res.status(404).send({ error: ERRORS.NOT_FOUND })

			const user = userSchema.parse(doc)
			return res.send({ data: user })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
} 