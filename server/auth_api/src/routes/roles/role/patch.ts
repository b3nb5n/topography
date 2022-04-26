import { errors, Response } from '@topography/comm'
import { RoleData, roleDataSchema } from '@topography/schema'
import { RequestHandler } from 'express'
import { Context } from '../../..'

export const updateRole = async (
	ctx: Context,
	id: string,
	data: Partial<RoleData>
) => {
	await ctx.prisma.role.update({ where: { id }, data })
}

export type PatchRoleResponse = Response<Awaited<ReturnType<typeof updateRole>>>

interface PatchRoleParams {
	id: string
}

export const patchRoleHandler = (
	ctx: Context
): RequestHandler<PatchRoleParams, PatchRoleResponse> => {
	return async (req, res) => {
		const { id } = req.params
		const parseResult = roleDataSchema.partial().safeParse(req.body)
		if (!parseResult.success)
			return res.status(400).send({ error: parseResult.error })
		const { data } = parseResult
		if (Object.keys.length === 0) res.send({})

		try {
			return res.send({ data: await updateRole(ctx, id, data) })
		} catch {
			return res.status(500).send({ error: errors.UNKNOWN })
		}
	}
}
