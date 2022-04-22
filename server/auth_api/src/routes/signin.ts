import { Response } from '@topography/comm'
import * as bcrypt from 'bcrypt'
import { RequestHandler } from 'express'
import * as jwt from 'jsonwebtoken'
import { z } from 'zod'
import { Context, Payload } from '..'

export const signinBodySchema = z.object({
	email: z.string().email(),
	password: z.string(),
})

export interface SigninResponseData {
	jwt: string
}

export type SigninResponse = Response<SigninResponseData>

const signin = (ctx: Context): RequestHandler<{}, SigninResponse> => {
	return async (req, res) => {
		const parseResponse = signinBodySchema.safeParse(req.body)
		if (!parseResponse.success)
			return res.status(400).send({ error: parseResponse.error })
		const { data } = parseResponse

		try {
			const user = await ctx.prisma.user.findUnique({
				where: { email: data.email },
			})

			if (!user) {
				return res.status(404).send({
					error: {
						email: "Couldn't find any users with that email",
					},
				})
			}

			const passwordMatches = await bcrypt.compare(data.password, user.password)
			if (!passwordMatches)
				return res.status(403).send({ error: { password: 'Incorrect password' } })

			const payload: Payload = { uid: user.id }
			const token = jwt.sign(payload, ctx.jwtSecret, {
				algorithm: 'HS256',
				expiresIn: '7d',
			})

			res.setHeader('set-cookie', `JWT_TOKEN:${token}; httponly; samesite=lax`)
			return res.send({ data: { jwt: token } })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}

export default signin
