import { ERRORS, Response } from '@topography/common'
import { RequestHandler } from 'express'
import { userRepository } from '../../../data-source'
import { userDataSchema } from '../../../entities'

export type PatchUserResponse = Response

interface PatchUserParams {
	id: string
}

export const patchUserHandler: RequestHandler<
	PatchUserParams,
	PatchUserResponse
> = async (req, res) => {
	let { id } = req.params
	// local variable `payload` set by `authenticate` middleware.
	if (id === 'me') id = res.locals.payload.uid

	const parseResult = userDataSchema
		.omit({ roleId: true })
		.partial()
		.safeParse(req.body)
	if (!parseResult.success)
		return res.status(400).send({ error: parseResult.error })
	const { data } = parseResult
	if (Object.keys(data).length === 0) res.send({})

	try {
		await userRepository.updateOne({ id }, { data })
		return res.send({})
	} catch {
		return res.status(500).send({ error: ERRORS.UNKNOWN })
	}
}
