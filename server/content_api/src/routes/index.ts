import { Router } from 'express'
import { Context } from '..'
import validateResourceIdHandler from '../middleware/validate-resource-id'
import collectionsRouter from './collections'
import itemsRouter from './items'
import propertiesRouter from './properties'

const router = (ctx: Context) => {
	const router = Router()

	router.use('/properties', propertiesRouter(ctx))
	router.use('/collections', collectionsRouter(ctx))
	router.use('/items', itemsRouter(ctx))

	router.use('/*/:id', validateResourceIdHandler)

	return router
}

export default router
