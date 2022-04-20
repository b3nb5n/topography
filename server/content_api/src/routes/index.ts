import { Router } from 'express'
import deleteCollection from './collections/collection/delete'
import getCollection from './collections/collection/get'
import patchCollection from './collections/collection/patch'
import getCollections from './collections/get'
import postCollection from './collections/post'
import getItems from './items/get'
import deleteItem from './items/item/delete'
import getItem from './items/item/get'
import patchItem from './items/item/patch'
import postItem from './items/post'
import getProperties from './properties/get'
import postProperty from './properties/post'
import deleteProperty from './properties/property/delete'
import getProperty from './properties/property/get'
import patchProperty from './properties/property/patch'

const router = Router()

router.get('/properties', getProperties)
router.post('/properties', postProperty)
router.get('/properties/:id', getProperty)
router.patch('/properties/:id', patchProperty)
router.delete('/properties/:id', deleteProperty)

router.get('/collections', getCollections)
router.post('collections', postCollection)
router.get('collections/:id', getCollection)
router.patch('/collections/:id', patchCollection)
router.delete('/collections/:id', deleteCollection)

router.get('/items', getItems)
router.post('/items', postItem)
router.get('/items/:id', getItem)
router.patch('/items/:id', patchItem)
router.delete('/items/:id', deleteItem)

export default router
