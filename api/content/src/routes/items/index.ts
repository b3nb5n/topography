import { Router } from 'express'
import { HandlerContext } from '..'
import deleteItemHandler from './:id/delete'
import getItemHandler from './:id/get'
import patchItemHandler from './:id/patch'
import getItemsHandler from './get'
import postItemHandler from './post'

export interface ItemsHandlerContext extends HandlerContext {}
export interface ItemsHandlerParams {
	collectionId: string
}

const itemsRouter = (ctx: ItemsHandlerContext) => {
	const router = Router()
	const basePath = '/:collectionId/items'

	router.get(basePath, getItemsHandler(ctx))
	router.post(basePath, postItemHandler(ctx))

	router.get(`${basePath}/:id`, getItemHandler(ctx))
	router.patch(`${basePath}/:id`, patchItemHandler(ctx))
	router.delete(`${basePath}/:id`, deleteItemHandler(ctx))

	return router
}

export default itemsRouter
