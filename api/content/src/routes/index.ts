import { resourceRouter, validateResourceIdHandler } from '@topography/api'
import { Router } from 'express'
import { DB } from '../db'
import { propertyDataSchema } from '../models'
import itemsRouter from './items'

export interface HandlerContext {
	db: DB
}

const router = (ctx: HandlerContext) => {
	const router = Router()

	router.use('/', (req, _res, next) => {
		console.log(req.url)
		next()
	})

	router.use('/', validateResourceIdHandler)

	router.use(
		'/properties',
		resourceRouter({
			dataSchema: propertyDataSchema,
			collection: ctx.db.properties,
		})
	)

	router.use('/collections/:collectionId/items', itemsRouter)

	// router.use(
	// 	'/collections',
	// 	resourceRouter({
	// 		dataSchema: collectionDataSchema,
	// 		collection: ctx.db.collections,
	// 	})
	// )

	return router
}

export default router
