import { Router } from 'express'
import { Context } from '../..'
import deleteCollection from './collection/delete'
import getCollection from './collection/get'
import patchCollection from './collection/patch'
import getCollections from './get'
import postCollection from './post'

const collectionsRouter = (ctx: Context) => {
	const router = Router()

	router.get('/', getCollections(ctx))
	router.post('/', postCollection(ctx))
	router.get('/:id', getCollection(ctx))
	router.patch('/:id', patchCollection(ctx))
	router.delete('/:id', deleteCollection(ctx))

	return router
}

export default collectionsRouter
