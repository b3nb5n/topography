import { Response } from '@topography/comm'
import { userDataSchema } from '@topography/schema'
import { RequestHandler } from 'express'
import { Context } from '../..'

export const getUsersData = async (ctx: Context) => {
	const users = await ctx.prisma.user.findMany()
	return users.map((user) => userDataSchema.parse(user))
}

type GetUsersResponse = Response<Awaited<ReturnType<typeof getUsersData>>>

export const getUsersHandler = (
	ctx: Context
): RequestHandler<{}, GetUsersResponse> => {
	return async (_req, res) => {
		// TODO: Authenticate request

		try {
			const data = await getUsersData(ctx)
			return res.send({ data })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}
