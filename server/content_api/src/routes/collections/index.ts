import { Router } from 'express'
import deleteCollection from './collection/delete'
import getCollection from './collection/get'
import patchCollection from './collection/patch'
import getCollections from './get'
import postCollection from './post'

const collectionsRouter = Router()

collectionsRouter.get('/', getCollections)
collectionsRouter.post('/', postCollection)
collectionsRouter.get('/:id', getCollection)
collectionsRouter.patch('/:id', patchCollection)
collectionsRouter.delete('/:id', deleteCollection)

export default collectionsRouter
