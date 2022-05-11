import { errors, Response } from '@topography/comm'
import { RequestHandler } from 'express'
import { Context } from '../../..'
import { userSchema } from '../../../generated/models'

export const getUserData = async (ctx: Context, id: string) => {
	const user = await ctx.prisma.user.findUnique({ where: { id } })
	if (!user) return null
	return userSchema.parse(user)
}

export type GetUserResponse = Response<Awaited<ReturnType<typeof getUserData>>>

interface GetUserParams {
	id: string
}

export const getUserHandler = (
	ctx: Context
): RequestHandler<GetUserParams, GetUserResponse> => {
	return async (req, res) => {
		let { id } = req.params
		// local variable `payload` set by `authenticate` middleware.
		if (id === 'me') id = res.locals.payload.uid

		try {
			const user = await getUserData(ctx, id)
			if (!user) return res.status(404).send({ error: errors.NOT_FOUND })
			return res.send({ data: user })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}
