import { Router } from 'express'
import { getTokenHandler } from './get'

const router = Router()

router.get('/', getTokenHandler)

export * from './get'

export default router
