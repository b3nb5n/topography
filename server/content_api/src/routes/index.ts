import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import validateResourceIdHandler from '../middleware/validate-resource-id'
import collectionsRouter from './collections'
import itemsRouter from './items'
import propertiesRouter from './properties'

export interface Context {
	prisma: PrismaClient
}

const router = Router()
export const context: Context = {
	prisma: new PrismaClient(),
}

router.use('/properties', propertiesRouter)
router.use('/collections', collectionsRouter)
router.use('/items', itemsRouter)

router.use('/*/:id', validateResourceIdHandler)

export default router
