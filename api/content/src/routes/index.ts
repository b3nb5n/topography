import { resourceRouter } from '@topography/api'
import { Router } from 'express'
import { DB } from '../db'
import { collectionDataSchema, propertyDataSchema } from '../models'
import itemsRouter from './items'

export interface HandlerContext {
	db: DB
}

const router = ({ db }: HandlerContext) => {
	const router = Router()

	router.use(
		'/properties',
		resourceRouter({
			dataSchema: propertyDataSchema,
			collection: db.properties,
		})
	)

	router.use(
		'/collections',
		resourceRouter({
			dataSchema: collectionDataSchema,
			collection: db.collections,
		}).use('/', itemsRouter({ db }))
	)

	return router
}

export default router
