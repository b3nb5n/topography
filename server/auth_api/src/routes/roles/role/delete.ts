import { Response } from '@topography/comm'
import { RequestHandler } from 'express'
import { Context } from '../../..'

export const deleteRole = async (ctx: Context, id: string) => {
	await ctx.prisma.role.delete({ where: { id } })
}

export type DeleteRoleResponse = Response<Awaited<ReturnType<typeof deleteRole>>>

interface DeleteRoleParams {
	id: string
}

export const deleteRoleHandler = (
	ctx: Context
): RequestHandler<DeleteRoleParams, DeleteRoleResponse> => {
	return async (req, res) => {
		const { id } = req.params

		// TODO: Authenticate request

		try {
			return res.send({ data: await deleteRole(ctx, id) })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}
