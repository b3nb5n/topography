import { Response } from '@topography/comm'
import { RoleData, roleDataSchema } from '@topography/schema'
import { RequestHandler } from 'express'
import { uid } from 'uid'
import { Context } from '../..'

export const createRole = async (ctx: Context, data: RoleData) => {
	await ctx.prisma.role.create({ data: { id: uid(16), ...data } })
}

export type PostRoleResponse = Response<Awaited<ReturnType<typeof createRole>>>

export const postRoleHandler = (
	ctx: Context
): RequestHandler<{}, PostRoleResponse> => {
	return async (req, res) => {
		const parseResult = roleDataSchema.safeParse(req.body)
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
