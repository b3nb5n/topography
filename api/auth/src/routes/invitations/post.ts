import { Resource, Response } from '@topography/common'
import { RequestHandler } from 'express'
import { HandlerContext } from '..'
import { Invitation, invitationDataSchema } from '../../models'

export type PostInvitationResponse = Response<{ id: string }>

export const postInvitationHandler = (
	ctx: HandlerContext
): RequestHandler<{}, PostInvitationResponse> => {
	return async (req, res) => {
		const parseResult = invitationDataSchema.safeParse(req.body)
		if (!parseResult.success)
			return res.status(400).send({ error: parseResult.error })
		const { data } = parseResult

		try {
			const invitation: Invitation = new Resource({ data })
			await ctx.db.invitations.insertOne(invitation.toBson())
			return res.status(201).send({ data: { id: invitation._id.toString() } })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}
