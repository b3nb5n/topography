import { Response } from '@topography/common'
import { RequestHandler } from 'express'
import { HandlerContext } from '..'
import { RoleShape } from '../../models'

export type GetRolesResponse = Response<RoleShape[]>

export const getRolesHandler = (
	ctx: HandlerContext
): RequestHandler<{}, GetRolesResponse> => {
	return async (_req, res) => {
		try {
			const roles = await ctx.db.roles.find().toArray()
			return res.send({ data: roles })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
} 