import { Router } from 'express'
import { HandlerContext } from '..'
import getItemsHandler from './get'
import postItemHandler from './post'

export interface ItemsHandlerContext extends HandlerContext {}
export interface ItemsHandlerParams {
	collectionId: string
}

const itemsRouter = (ctx: ItemsHandlerContext) => {
	const router = Router()

	router.get('/', getItemsHandler(ctx))
	router.post('/', postItemHandler(ctx))

	return router
}

export default itemsRouter
