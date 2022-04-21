import { Router } from 'express'
import { Context } from '../..'
import getItems from './get'
import deleteItem from './item/delete'
import getItem from './item/get'
import patchItem from './item/patch'
import postItem from './post'

const itemsRouter = (ctx: Context) => {
	const router = Router()

	router.get('/', getItems(ctx))
	router.post('/', postItem(ctx))
	router.get('/:id', getItem(ctx))
	router.patch('/:id', patchItem(ctx))
	router.delete('/:id', deleteItem(ctx))

	return router
}

export default itemsRouter
