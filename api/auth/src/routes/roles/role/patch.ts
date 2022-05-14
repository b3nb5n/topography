import { ERRORS, Response } from '@topography/common'
import { RequestHandler } from 'express'
import { ObjectId } from 'mongodb'
import { HandlerContext } from '../..'
import { roleDataSchema } from '../../../models'

export type PatchRoleResponse = Response

interface PatchRoleParams {
	id: string
}

export const patchRoleHandler = (
	ctx: HandlerContext
): RequestHandler<PatchRoleParams, PatchRoleResponse> => {
	return async (req, res) => {
		const _id = new ObjectId(req.params.id)
		const parseResult = roleDataSchema.partial().safeParse(req.body)
		if (!parseResult.success)
			return res.status(400).send({ error: parseResult.error })
		const { data } = parseResult
		if (Object.keys.length === 0) res.send({})

		try {
			await ctx.db.roles.updateOne({ _id }, { data })
			return res.send({})
		} catch {
			return res.status(500).send({ error: ERRORS.UNKNOWN })
		}
	}
} 