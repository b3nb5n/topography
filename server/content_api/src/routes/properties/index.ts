import { Router } from 'express'
import getProperties from './get'
import postProperty from './post'
import deleteProperty from './property/delete'
import getProperty from './property/get'
import patchProperty from './property/patch'

const propertiesRouter = Router()

propertiesRouter.get('/', getProperties)
propertiesRouter.post('/', postProperty)
propertiesRouter.get('/:id', getProperty)
propertiesRouter.patch('/:id', patchProperty)
propertiesRouter.delete('/:id', deleteProperty)

export default propertiesRouter
