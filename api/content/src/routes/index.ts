import { Router } from 'express'
import { z } from 'zod'
import { DB } from '../db'
import { collectionDataSchema, propertyDataSchema } from '../models'
import resourceRouter from './resource'

export interface HandlerContext {
	db: DB
}

const router = (ctx: HandlerContext) => {
	const router = Router()

	router.use(
		'/properties',
		resourceRouter({ ...ctx, dataSchema: propertyDataSchema })
	)
	router.use(
		'/collections',
		resourceRouter({ ...ctx, dataSchema: collectionDataSchema })
	)
	router.use(
		'/items',
		resourceRouter({ ...ctx, dataSchema: z.object({}).passthrough() })
	)

	return router
}

export default router
