import { Response } from '@topography/common'
import { RequestHandler } from 'express'
import { userRepository } from '../../data-source'
import { User } from '../../entities'

type GetUsersResponse = Response<User[]>

export const getUsersHandler: RequestHandler<{}, GetUsersResponse> = async (
	_req,
	res
) => {
	try {
		const users = await userRepository.find()
		return res.send({ data: users })
	} catch (error) {
		return res.status(500).send({ error })
	}
}
