import { Router } from 'express'
import invitationsRouter from './invitations'
import rolesRouter from './roles'
import tokenRouter from './token'
import usersRouter from './users'

const router = Router()

router.use('/invitations', invitationsRouter)
router.use('/users', usersRouter)
router.use('/roles', rolesRouter)
router.use('/token', tokenRouter)

export default router
