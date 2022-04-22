import { Response } from '@topography/comm'
import { RequestHandler } from 'express'
import { Context } from '../../..'

export type DeleteUserResponse = Response

interface DeleteUserParams {
	id: string
}

const deleteUser = (
	ctx: Context
): RequestHandler<DeleteUserParams, DeleteUserResponse> => {
	return async (req, res) => {
		const { id } = req.params

		// TODO: authenticate request

		try {
			await ctx.prisma.user.delete({ where: { id } })
			return res.send({})
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}
