import { Router } from 'express'
import getResources from './get'
import postResource from './post'
import deleteResource from './{id}/delete'
import getResource from './{id}/get'
import patchResource from './{id}/patch'

const router = Router()

router.get('/', getResources)
router.post('/', postResource)
router.get('/:id', getResource)
router.patch('/:id', patchResource)
router.delete('/:id', deleteResource)

export default router
