import { Invitation } from '@prisma/client'
import { Response } from '@topography/comm'
import { RequestHandler } from 'express'
import { Context } from '../..'

type GetInvitationsResponse = Response<Invitation[]>

export const getInvitations = (
	ctx: Context
): RequestHandler<{}, GetInvitationsResponse> => {
	return async (_req, res) => {
		// TODO: Authenticate request

		try {
			const invitations = await ctx.prisma.invitation.findMany()
			return res.send({ data: invitations })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}

export default getInvitations
