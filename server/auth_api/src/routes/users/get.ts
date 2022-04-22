import { Response } from '@topography/comm'
import { UserData, userDataSchema } from '@topography/schema'
import { RequestHandler } from 'express'
import { Context } from '../..'

type GetUsersResponse = Response<UserData[]>

export const getUsers = (ctx: Context): RequestHandler<{}, GetUsersResponse> => {
	return async (_req, res) => {
		// TODO: Authenticate request

		try {
			const users = await ctx.prisma.user.findMany()
			const data = users.map((user) => userDataSchema.parse(user))
			return res.send({ data })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}

export default getUsers
