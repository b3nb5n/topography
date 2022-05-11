import { errors, Response } from '@topography/comm'
import { RequestHandler } from 'express'
import { HandlerParams } from '.'
import { ResourceHandlerContext } from '..'

export type GetResourceResponse<T> = Response<T>

const getResource = (
	_ctx: ResourceHandlerContext
): RequestHandler<HandlerParams, GetResourceResponse<unknown>> => {
	return (req, res) => {
		const { id } = req.params
		if (!id) return res.status(400).send({ error: errors.INVALID_ID })

		try {
			// TODO: get resource from db

			return res.status(200).send({ data: null })
		} catch (error) {
			return res.status(500).send({ error })
		}
	}
} 

export default getResource
