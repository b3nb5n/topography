import { resourceRouter } from '@topography/api'
import { Router } from 'express'
import { DB } from '../db'
import { collectionDataSchema, propertyDataSchema } from '../models'

export interface HandlerContext {
	db: DB
}

const router = (ctx: HandlerContext) => {
	const router = Router()

	router.use(
		'/properties',
		resourceRouter({
			dataSchema: propertyDataSchema,
			collection: ctx.db.properties,
		})
	)

	router.use(
		'/collections',
		resourceRouter({
			dataSchema: collectionDataSchema,
			collection: ctx.db.collections,
		})
	)

	return router
}

export default router
