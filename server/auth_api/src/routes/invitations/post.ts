import { dataSchema, Response } from '@topography/comm'
import { invitationSchema } from '@topography/schema'
import { RequestHandler } from 'express'
import { uid } from 'uid'
import { Context } from '../..'

export interface PostInvitationResponseData {
	id: string
}

export type PostInvitationResponse = Response<PostInvitationResponseData>

export const postInvitation = (
	ctx: Context
): RequestHandler<{}, PostInvitationResponse> => {
	return async (req, res) => {
		const parseResult = dataSchema(invitationSchema).safeParse(req.body)
		if (!parseResult.success)
			return res.status(400).send({ error: parseResult.error })
		const { data } = parseResult

		// TODO: Authenticate request

		try {
			const invitation = await ctx.prisma.invitation.create({
				data: {
					id: uid(16),
					email: data.email,
					role: { connect: { id: data.roleId } },
				},
			})

			return res.status(201).send({ data: { id: invitation.id } })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}

export default postInvitation
