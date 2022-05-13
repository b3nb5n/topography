import { Response } from '@topography/common'
import { RequestHandler } from 'express'
import { HandlerContext } from '..'
import { InvitationShape } from '../../models'

type GetInvitationsResponse = Response<InvitationShape[]>

export const getInvitationsHandler = (
	ctx: HandlerContext
): RequestHandler<{}, GetInvitationsResponse> => {
	return async (_req, res) => {
		try {
			const invitations = await ctx.db.invitations.find().toArray()
			return res.send({ data: invitations })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
} 
