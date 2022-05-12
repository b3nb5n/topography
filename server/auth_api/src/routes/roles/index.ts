import { Router } from 'express'
import authenticate from '../../middleware/authenticate'
import { getRolesHandler } from './get'
import { postRoleHandler } from './post'
import { deleteRoleHandler } from './role/delete'

const router = Router()

router.use('/', authenticate)

router.get('/', getRolesHandler)
router.post('/', postRoleHandler)
router.patch('/:id', postRoleHandler)
router.delete('/:id', deleteRoleHandler)

export * from './get'
export * from './post'
export * from './role/delete'
export * from './role/patch'

export default router
