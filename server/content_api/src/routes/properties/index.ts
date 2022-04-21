import { Router } from 'express'
import { context } from '..'
import getProperties from './get'
import postProperty from './post'
import deleteProperty from './property/delete'
import getProperty from './property/get'
import patchProperty from './property/patch'

const propertiesRouter = Router()

propertiesRouter.get('/', getProperties(context))
propertiesRouter.post('/', postProperty(context))
propertiesRouter.get('/:id', getProperty(context))
propertiesRouter.patch('/:id', patchProperty(context))
propertiesRouter.delete('/:id', deleteProperty(context))

export default propertiesRouter
