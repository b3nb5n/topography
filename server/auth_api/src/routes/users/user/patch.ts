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
		const { id } = req.params
		if (!id) return res.status(400).send({ error: errors.MISSING_ID })

		// TODO: filter data
		const parseResult = userDataSchema.partial().safeParse(req.body)
		if (!parseResult.success) return res.sendStatus(400)
		const { data } = parseResult

		try {
			return res.send({ data: await updateUser(ctx, id, data) })
		} catch {
			return res.status(500).send({ error: errors.UNKNOWN })
		}
	}
}
