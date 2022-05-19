import { ResourceShape } from '@topography/common'
import { Router } from 'express'
import { Collection } from 'mongodb'
import { z } from 'zod'
import { deleteResourceHandler } from './:id/delete'
import { getResourceHandler } from './:id/get'
import { patchResourceHandler } from './:id/patch'
import { getResourcesHandler } from './get'
import { postResourceHandler } from './post'

export interface ResourceHandlerContext<T extends z.AnyZodObject> {
	collection: Collection<ResourceShape<z.TypeOf<T>>>
	dataSchema: T
}

export const resourceRouter = <T extends z.AnyZodObject>(
	ctx: ResourceHandlerContext<T>
) => {
	const router = Router()

	router.get('/', getResourcesHandler(ctx))
	router.post('/', postResourceHandler(ctx))

	router.get('/:id', getResourceHandler(ctx))
	router.patch('/:id', patchResourceHandler(ctx))
	router.delete('/:id', deleteResourceHandler(ctx))

	return router
}

export * from './:id'
export * from './get'
export * from './post'

