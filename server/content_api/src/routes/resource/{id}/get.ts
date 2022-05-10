import { errors, Response } from '@topography/comm'
import { RequestHandler } from 'express'
import { HandlerParams } from '.'
import getContext from '../../../utils/get-context'

export type GetResourceResponse<T> = Response<T>

const getResource: RequestHandler<HandlerParams, GetResourceResponse<any>> = (
	req,
	res
) => {
	const { id } = req.params
	if (!id) return res.status(400).send({ error: errors.INVALID_ID })

	try {
		const ctx = getContext(res)

		// TODO: get resource from db

		return res.status(200).send({ data: null })
	} catch (error) {
		return res.status(500).send({ error })
	}
}

export default getResource
