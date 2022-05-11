import { Response } from '@topography/comm'
import { RequestHandler } from 'express'
import { HandlerParams } from '.'
import { ResourceHandlerContext } from '..'

export type DeleteResourceResponse = Response

const deleteResource = (
	_ctx: ResourceHandlerContext
): RequestHandler<HandlerParams, DeleteResourceResponse> => {
	return (req, res) => {
		const { id } = req.params
		if (!id) return res.status(400).send()

		try {
			// TODO: delete resource in db

			return res.status(200).send({})
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
} 

export default deleteResource
