import { Router } from 'express'
import { HandlerContext } from '..'
import getPropertiesHandler from './get'
import postPropertyHandler from './post'

export interface PropertiesHandlerContext extends HandlerContext {}

const propertiesRouter = (ctx: HandlerContext) => {
	const router = Router()

	router.get('/', getPropertiesHandler(ctx))
	router.post('/', postPropertyHandler(ctx))

	return router
}

export default propertiesRouter
