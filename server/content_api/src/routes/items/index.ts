import { Router } from 'express'
import { context } from '..'
import getItems from './get'
import deleteItem from './item/delete'
import getItem from './item/get'
import patchItem from './item/patch'
import postItem from './post'

const itemsRouter = Router()

itemsRouter.get('/', getItems(context))
itemsRouter.post('/', postItem(context))
itemsRouter.get('/:id', getItem(context))
itemsRouter.patch('/:id', patchItem(context))
itemsRouter.delete('/:id', deleteItem(context))

export default itemsRouter
