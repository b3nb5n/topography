import { Router } from 'express'
import { z } from 'zod'
import validateResourceId from '../../middleware/validate-resource-id'
import getResources from './get'
import postResource from './post'
import deleteResource from './{id}/delete'
import getResource from './{id}/get'
import patchResource from './{id}/patch'

export interface ResourceHandlerContext {
	dataSchema: z.AnyZodObject
}

const resourceRouter = (ctx: ResourceHandlerContext) => {
	const router = Router()

	router.get('/', getResources(ctx))
	router.post('/', postResource(ctx))

	router.use('/:id', validateResourceId)
	router.get('/:id', getResource(ctx))
	router.patch('/:id', patchResource(ctx))
	router.delete('/:id', deleteResource(ctx))

	return router
}

export default resourceRouter
