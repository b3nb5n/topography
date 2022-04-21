import { dataSchema, invitationSchema } from '@topography/utils'
import { Handler } from 'express'
import { uid } from 'uid'
import { Context } from '..'

export const postInvitation = (ctx: Context): Handler => {
	return async (req, res) => {
		const parseResult = dataSchema(invitationSchema).safeParse(req.body)
		if (!parseResult.success) return res.sendStatus(400)
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

			return res.send({ resource: { id: invitation.id } })
		} catch (err) {
			return res.sendStatus(500)
		}
	}
}

export default postInvitation
