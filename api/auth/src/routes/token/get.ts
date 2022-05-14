import { ERRORS, Response } from '@topography/common'
import * as bcrypt from 'bcrypt'
import { RequestHandler } from 'express'
import * as jwt from 'jsonwebtoken'
import { z } from 'zod'
import { HandlerContext } from '..'
import { Payload } from '../../utils/payload'

export const getTokenBodySchema = z.object({
	email: z.string().email(),
	password: z.string(),
})

export type GetTokenBody = z.TypeOf<typeof getTokenBodySchema>
export type GetTokenResponse = Response<{ jwt: string }>

export const getTokenHandler = (
	ctx: HandlerContext
): RequestHandler<{}, GetTokenResponse> => {
	return async (req, res) => {
		const { JWT_SECRET } = process.env
		if (!JWT_SECRET) return res.status(500).send({ error: ERRORS.UNKNOWN })

		const parseResponse = getTokenBodySchema.safeParse(req.body)
		if (!parseResponse.success)
			return res.status(400).send({ error: parseResponse.error })
		const { data } = parseResponse

		try {
			const user = await ctx.db.users.findOne({ 'data.email': data.email })
			if (!user)
				return res.status(404).send({ error: 'unknown account identifier' })

			const passwordMatches = await bcrypt.compare(
				data.password,
				user.data.password
			)
			if (!passwordMatches)
				return res.status(406).send({ error: 'incorrect password' })

			const payload: Payload = { uid: user._id.toString() }
			const token = jwt.sign(payload, JWT_SECRET, {
				algorithm: 'HS256',
				expiresIn: '7d',
			})

			return res.send({ data: { jwt: token } })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}