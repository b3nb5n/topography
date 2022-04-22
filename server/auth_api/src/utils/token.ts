import * as jwt from 'jsonwebtoken'

const validateToken = () => {}

export const parseToken = (token: string) => {
	const parseResult = payloadSchema.safeParse(jwt.decode(token))
}
