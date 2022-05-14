import { Response } from '@topography/common'
import { RequestHandler } from 'express'
import { HandlerContext } from '..'
import { UserShape } from '../../models'

type GetUsersResponse = Response<UserShape[]>

export const getUsersHandler = (
	ctx: HandlerContext
): RequestHandler<{}, GetUsersResponse> => {
	return async (_req, res) => {
		try {
			const users = await ctx.db.users.find().toArray()
			return res.send({ data: users })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}