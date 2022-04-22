import { Response } from '@topography/comm'
import { roleDataSchema } from '@topography/schema'
import { RequestHandler } from 'express'
import { uid } from 'uid'
import { Context } from '../..'

export interface PostRoleResponseData {
	id: string
}

export type PostRoleResponse = Response<PostRoleResponseData>

export const postRole = (ctx: Context): RequestHandler<{}, PostRoleResponse> => {
	return async (req, res) => {
		const parseResult = roleDataSchema.safeParse(req.body)
		if (!parseResult.success)
			return res.status(400).send({ error: parseResult.error })
		const { data } = parseResult

		// TODO: Authenticate request

		try {
			const role = await ctx.prisma.role.create({
				data: { id: uid(16), ...data },
			})

			return res.status(201).send({ data: { id: role.id } })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}

export default postRole
