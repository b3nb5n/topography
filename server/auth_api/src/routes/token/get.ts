import { Response } from '@topography/comm'
import * as bcrypt from 'bcrypt'
import { RequestHandler } from 'express'
import * as jwt from 'jsonwebtoken'
import { z } from 'zod'
import { Context } from '../..'
import { Payload } from '../../utils/payload'

export const getTokenBodySchema = z.object({
	email: z.string().email(),
	password: z.string(),
})

export type GetTokenBody = z.TypeOf<typeof getTokenBodySchema>
export type GetTokenResponse = Response<{ jwt: string }>

export const getTokenHandler = (
	ctx: Context
): RequestHandler<{}, GetTokenResponse> => {
	return async (req, res) => {
		const parseResponse = getTokenBodySchema.safeParse(req.body)
		if (!parseResponse.success)
			return res.status(400).send({ error: parseResponse.error })
		const { data } = parseResponse

		try {
			const user = await ctx.prisma.user.findUnique({
				where: { email: data.email },
			})
			if (!user)
				return res.status(404).send({ error: 'unknown account identifier' })

			const passwordMatches = await bcrypt.compare(data.password, user.password)
			if (!passwordMatches)
				return res.status(406).send({ error: 'incorrect password' })

			const payload: Payload = { uid: user.id }
			const token = jwt.sign(payload, ctx.jwtSecret, {
				algorithm: 'HS256',
				expiresIn: '7d',
			})

			return res.send({ data: { jwt: token } })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}
