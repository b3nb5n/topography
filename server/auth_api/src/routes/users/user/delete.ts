import { Response } from '@topography/comm'
import { RequestHandler } from 'express'
import { Context } from '../../..'

export const deleteUser = async (ctx: Context, id: string) => {
	await ctx.prisma.user.delete({ where: { id } })
}

export type DeleteUserResponse = Response<Awaited<ReturnType<typeof deleteUser>>>

interface DeleteUserParams {
	id: string
}

export const deleteUserHandler = (
	ctx: Context
): RequestHandler<DeleteUserParams, DeleteUserResponse> => {
	return async (req, res) => {
		let { id } = req.params
		// local variable `payload` set by `authenticate` middleware.
		if (id === 'me') id = res.locals.payload.uid

		try {
			await deleteUser(ctx, id)
			return res.send({})
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}
