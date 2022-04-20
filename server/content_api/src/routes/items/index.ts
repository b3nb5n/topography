import { Router } from 'express'
import getItems from './get'
import deleteItem from './item/delete'
import getItem from './item/get'
import patchItem from './item/patch'
import postItem from './post'

const itemsRouter = Router()

itemsRouter.get('/', getItems)
itemsRouter.post('/', postItem)
itemsRouter.get('/:id', getItem)
itemsRouter.patch('/:id', patchItem)
itemsRouter.delete('/:id', deleteItem)

export default itemsRouter
