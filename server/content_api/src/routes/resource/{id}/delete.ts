import { Response } from '@topography/comm'
import { RequestHandler } from 'express'
import { HandlerParams } from '.'

export type DeleteResourceResponse = Response

const deleteResource: RequestHandler<HandlerParams, DeleteResourceResponse> = (
	req,
	res
) => {
	const { id } = req.params
	if (!id) return res.status(400).send()

	try {
		// TODO: delete resource in db

		return res.status(200).send({})
	} catch (error) {
		return res.status(500).send({ error })
	}
}

export default deleteResource
