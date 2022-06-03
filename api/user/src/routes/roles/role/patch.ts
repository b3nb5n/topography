import { flattenDocument } from '@topography/api'
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
		if (Object.keys(data).length === 0) res.send({})

		try {
			const result = await ctx.db.roles.updateOne(
				{ _id },
				{ $set: flattenDocument({ data }) }
			)

			if (!result.acknowledged) throw ERRORS.UNKNOWN
			if (!result.modifiedCount) res.status(404).send({ error: ERRORS.NOT_FOUND })

			return res.send({})
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}
