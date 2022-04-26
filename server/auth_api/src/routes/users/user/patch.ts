import { errors, Response } from '@topography/comm'
import { UserData, userDataSchema } from '@topography/schema'
import { RequestHandler } from 'express'
import { Context } from '../../..'

export const updateUser = async (
	ctx: Context,
	id: string,
	data: Partial<UserData>
) => {
	await ctx.prisma.user.update({ where: { id }, data })
}

export type PatchUserResponse = Response<Awaited<ReturnType<typeof updateUser>>>

interface PatchUserParams {
	id: string
}

export const patchUserHandler = (
	ctx: Context
): RequestHandler<PatchUserParams, PatchUserResponse> => {
	return async (req, res) => {
		let { id } = req.params
		// local variable `payload` set by `authenticate` middleware.
		if (id === 'me') id = res.locals.payload.uid
		

		const parseResult = userDataSchema.partial().safeParse(req.body)
		if (!parseResult.success)
			return res.status(400).send({ error: parseResult.error })
		const { data } = parseResult
		if (Object.keys.length === 0) res.send({})

		try {
			return res.send({ data: await updateUser(ctx, id, data) })
		} catch {
			return res.status(500).send({ error: errors.UNKNOWN })
		}
	}
}
