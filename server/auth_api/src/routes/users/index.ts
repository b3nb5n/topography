import { Router } from 'express'
import authenticate from '../../middleware/authenticate'
import meRedirect from '../../middleware/me-redirect'
import { getUsersHandler } from './get'
import { deleteUserHandler } from './user/delete'
import { getUserHandler } from './user/get'
import { patchUserHandler } from './user/patch'

const router = Router()

router.use('/', authenticate)
router.use('/me', meRedirect)

router.get('/', getUsersHandler)
router.get('/:id', getUserHandler)
router.patch('/:id', patchUserHandler)
router.delete('/:id', deleteUserHandler)

export * from './get'
export * from './user/delete'
export * from './user/get'
export * from './user/patch'

export default router
