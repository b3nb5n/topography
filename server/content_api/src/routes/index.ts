import { Router } from 'express'
import collectionsRouter from './collections'
import itemsRouter from './items'
import propertiesRouter from './properties'

const router = Router()

router.use('/properties', propertiesRouter)
router.use('/collections', collectionsRouter)
router.use('/items', itemsRouter)

export default router
