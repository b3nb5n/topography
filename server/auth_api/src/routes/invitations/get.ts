import { Handler } from 'express'
import { Context } from '../..'

export const getInvitations = (ctx: Context): Handler => {
	return async (_req, res) => {
		// TODO: Authenticate request

		try {
			const invitations = await ctx.prisma.invitation.findMany()
			return { resources: invitations }
		} catch (err) {
			return res.sendStatus(500)
		}
	}
}

export default getInvitations
