import { ERRORS, Response } from '@topography/common'
import { RequestHandler } from 'express'
import { HandlerParams } from '.'
import { ResourceHandlerContext } from '..'

export type PatchResourceResponse = Response

const patchResource = (
	ctx: ResourceHandlerContext
): RequestHandler<HandlerParams, PatchResourceResponse> => {
	return (req, res) => {
		const { id } = req.params
		if (!id) return res.status(400).send({ error: ERRORS.MISSING_ID })

		try {
			const parseResult = ctx.dataSchema.partial().safeParse(req.body)
			if (!parseResult.success)
				return res.status(400).send({ error: parseResult.error })

			// TODO: update resource in db

			return res.send({})
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
}

export default patchResource
