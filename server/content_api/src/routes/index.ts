import { Router } from 'express'
import deleteCollection from './collections/collection/delete'
import getCollection from './collections/collection/get'
import patchCollection from './collections/collection/patch'
import getCollections from './collections/get'
import postCollection from './collections/post'
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

export default router
