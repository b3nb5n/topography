import { Router } from 'express'
import authenticate from '../../middleware/authenticate'
import unless from '../../middleware/unless'
import { getInvitationsHandler } from './get'
import { acceptInvitationHandler } from './invitation/accept'
import { deleteInvitationHandler } from './invitation/delete'
import { postInvitationHandler } from './post'

const router = Router()

router.use(unless(['/:id/accept'], authenticate))

router.get('/', getInvitationsHandler)
router.post('/', postInvitationHandler)
router.delete('/:id', deleteInvitationHandler)
router.post('/:id/accept', acceptInvitationHandler)

export * from './get'
export * from './invitation/accept'
export * from './invitation/delete'
export * from './post'

export default router
