import { ERRORS, Response } from '@topography/common'
import { RequestHandler } from 'express'
import { ObjectID } from 'typeorm'
import { userRepository } from '../../../data-source'
import { User } from '../../../entities'

export type GetUserResponse = Response<User>

interface GetUserParams {
	id: string
}

export const getUserHandler: RequestHandler<
	GetUserParams,
	GetUserResponse
> = async (req, res) => {
	let { id } = req.params
	// local variable `payload` set by `authenticate` middleware.
	if (id === 'me') id = res.locals.payload.uid

	try {
		const user = await userRepository.findOne({ where: { id: new ObjectID(id) } })
		if (!user) return res.status(404).send({ error: ERRORS.NOT_FOUND })
		return res.send({ data: user })
	} catch (error) {
		return res.status(500).send({ error })
	}
}
