import { errors, Response } from '@topography/comm'
import { userDataSchema } from '@topography/schema'
import { RequestHandler } from 'express'
import { Context } from '../../..'

export type PatchUserResponse = Response<undefined>

interface PatchUserParams {
	id: string
}

const patchUser = (
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
			await ctx.prisma.user.update({ where: { id }, data })
			return res.send({})
		} catch {
			return res.status(500).send({ error: errors.UNKNOWN })
		}
	}
}

export default patchUser
