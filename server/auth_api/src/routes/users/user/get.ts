import { User } from '@prisma/client'
import { Response } from '@topography/comm'
import { RequestHandler } from 'express'
import { Context } from '../../..'

export type GetUserResponse = Response<User>

interface GetUserParams {
	id: string
}

const getUser = (ctx: Context): RequestHandler<GetUserParams, GetUserResponse> => {
	return (req, res) => {
		let id = req.params.id
		if (id === 'me') id = req.cookies.jwt
	}
}
