import { ERRORS, Response } from '@topography/common'
import { RequestHandler } from 'express'
import { roleRepository } from '../../../data-source'
import { roleDataSchema } from '../../../entities'

export type PatchRoleResponse = Response

interface PatchRoleParams {
	id: string
}

export const patchRoleHandler: RequestHandler<
	PatchRoleParams,
	PatchRoleResponse
> = async (req, res) => {
	const { id } = req.params
	const parseResult = roleDataSchema.partial().safeParse(req.body)
	if (!parseResult.success)
		return res.status(400).send({ error: parseResult.error })
	const { data } = parseResult
	if (Object.keys.length === 0) res.send({})

	try {
		await roleRepository.updateOne({ id }, { data })
		return res.send({})
	} catch {
		return res.status(500).send({ error: ERRORS.UNKNOWN })
	}
}
