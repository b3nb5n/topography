import { ResourceShape } from '@topography/common'
import { Router } from 'express'
import { Collection } from 'mongodb'
import { z } from 'zod'
import { deleteResource } from './:id/delete'
import { getResource } from './:id/get'
import { patchResource } from './:id/patch'
import { getResources } from './get'
import { postResource } from './post'

export interface ResourceHandlerContext<T extends z.AnyZodObject> {
	collection: Collection<ResourceShape<z.TypeOf<T>>>
	dataSchema: T
}

export const resourceRouter = <T extends z.AnyZodObject>(
	ctx: ResourceHandlerContext<T>
) => {
	const router = Router()

	router.get('/', getResources(ctx))
	router.post('/', postResource(ctx))

	router.get('/:id', getResource(ctx))
	router.patch('/:id', patchResource(ctx))
	router.delete('/:id', deleteResource(ctx))

	return router
}

export * from './:id'
export * from './get'
export * from './post'

