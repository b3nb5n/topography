import { Router } from 'express'
import { context } from '..'
import deleteCollection from './collection/delete'
import getCollection from './collection/get'
import patchCollection from './collection/patch'
import getCollections from './get'
import postCollection from './post'

const collectionsRouter = Router()

collectionsRouter.get('/', getCollections(context))
collectionsRouter.post('/', postCollection(context))
collectionsRouter.get('/:id', getCollection(context))
collectionsRouter.patch('/:id', patchCollection(context))
collectionsRouter.delete('/:id', deleteCollection(context))

export default collectionsRouter
