import { errors, Response } from '@topography/comm'
import { userDataSchema } from '@topography/schema'
import { validateResourceId } from '@topography/utils'
import { RequestHandler } from 'express'
import * as jwt from 'jsonwebtoken'
import { Context } from '../../..'
import { payloadShema } from '../../../utils/payload'

export const getUserData = async (ctx: Context, id: string) => {
	const user = await ctx.prisma.user.findUnique({ where: { id } })
	if (!user) return null
	return userDataSchema.parse(user)
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
		if (id === 'me') {
			const parseResult = payloadShema.safeParse(jwt.decode(req.cookies.jwt))
			if (parseResult.success) id = parseResult.data.uid
		}
		if (!validateResourceId(id))
			return res.status(400).send({ error: 'invalid resource id' })

		try {
			const user = await getUserData(ctx, id)
			if (!user) return res.status(404).send({ error: errors.NOT_FOUND })
			return res.send({ data: user })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}
