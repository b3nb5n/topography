import { Router } from 'express'
import { z } from 'zod'
import { collectionDataSchema, propertyDataSchema } from '../models'
import resourceRouter from './resource'

const router = Router()

router.use('/properties', resourceRouter({ dataSchema: propertyDataSchema }))
router.use('/collections', resourceRouter({ dataSchema: collectionDataSchema }))
router.use('/items', resourceRouter({ dataSchema: z.object({}).passthrough() }))

export default router
