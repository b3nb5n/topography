import { idSchema } from '@topography/utils'
import { Handler } from 'express'
import { Context } from '../..'

export const acceptInvitation = (ctx: Context): Handler => {
	return async (req, res) => {
		const parseResult = idSchema.safeParse(req.params.id)
		if (!parseResult.success) return res.sendStatus(400)
		const id = parseResult.data

		try {
			const invitation = await ctx.prisma.invitation.findUnique({ where: { id } })
			if (!invitation) return res.sendStatus(404)

			const [_, user] = await ctx.prisma.$transaction([
				ctx.prisma.invitation.delete({ where: { id } }),
				ctx.prisma.user.create({
					data: {
						id,
						email: invitation.email,
						firstName: '',
						lastName: '',
						password: '',
						role: { connect: { id: invitation.roleId } },
					},
				}),
			])

			return res.sendStatus(200)
		} catch (err) {
			return res.sendStatus(500)
		}
	}
}

export default acceptInvitation
