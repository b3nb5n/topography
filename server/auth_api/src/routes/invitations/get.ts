import { Response } from '@topography/comm'
import { RequestHandler } from 'express'
import { Context } from '../..'
import { invitationSchema } from '../../generated/models'

export const getInvitationsData = async (ctx: Context) => {
	const invitations = await ctx.prisma.invitation.findMany()
	return invitations.map((data) => invitationSchema.parse(data))
}

type GetInvitationsResponse = Response<
	Awaited<ReturnType<typeof getInvitationsData>>
>

export const getInvitationsHandler = (
	ctx: Context
): RequestHandler<{}, GetInvitationsResponse> => {
	return async (_req, res) => {
		try {
			return res.send({ data: await getInvitationsData(ctx) })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}
