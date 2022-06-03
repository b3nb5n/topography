import { Resource, Response } from '@topography/common'
import { RequestHandler } from 'express'
import { ObjectId } from 'mongodb'
import { HandlerContext } from '..'
import { RoleData, roleDataSchema } from '../../models'

export type PostRoleResponse = Response<{ id: ObjectId }>

export const postRoleHandler = (
	ctx: HandlerContext
): RequestHandler<{}, PostRoleResponse> => {
	return async (req, res) => {
		const parseResult = roleDataSchema.safeParse(req.body)
		if (!parseResult.success)
			return res.status(400).send({ error: parseResult.error })
		const { data } = parseResult

		try {
			const role = new Resource<RoleData>({ data })
			await ctx.db.roles.insertOne(role.toBson())
			return res.status(201).send({ data: { id: role._id } })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}
