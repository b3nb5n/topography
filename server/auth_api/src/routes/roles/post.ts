import { Response } from '@topography/comm'
import { RequestHandler } from 'express'
import { uid } from 'uid'
import { Context } from '../..'
import { roleSchema } from '../../generated/models'
import { Role } from '../../generated/prisma'

export const createRole = async (ctx: Context, data: Role) => {
	await ctx.prisma.role.create({ data: { ...data, id: uid(16) } })
}

export type PostRoleResponse = Response<Awaited<ReturnType<typeof createRole>>>

export const postRoleHandler = (
	ctx: Context
): RequestHandler<{}, PostRoleResponse> => {
	return async (req, res) => {
		const parseResult = roleSchema.safeParse(req.body)
		if (!parseResult.success)
			return res.status(400).send({ error: parseResult.error })
		const { data } = parseResult

		try {
			return res.status(201).send({ data: await createRole(ctx, data) })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}
