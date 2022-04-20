import express from 'express'
import deleteCollection from './collections/collection/delete'
import getCollection from './collections/collection/get'
import patchCollection from './collections/collection/patch'
import getCollections from './collections/get'
import postCollection from './collections/post'
import db from './prisma'

const PORT = 8080
const app = express()

app.get('/properties')
app.post('/properties')
app.get('/properties/:propertyId')
app.patch('/properties/:propertyId')
app.delete('/properties/:propertyId')

app.get('/properties/:propertyId/collections', getCollections)
app.post('/properties/:propertyId/collections', postCollection)
app.get('/properties/:propertyId/collections/:collectionId', getCollection)
app.patch('/properties/:propertyId/collections/:collectionId', patchCollection)
app.delete('/properties/:propertyId/collections/:collectionId', deleteCollection)

app.get('/properties/:propertyId/collections/:collectionId/items')
app.post('/properties/:propertyId/collections/:collectionId/items')
app.get('/properties/:propertyId/collections/:collectionId/items/:itemId')
app.patch('/properties/:propertyId/collections/:collectionId/items/:itemId')
app.delete('/properties/:propertyId/collections/:collectionId/items/:itemId')

const server = app.listen(PORT, () =>
	console.log(`Content API running on port ${PORT}`)
)

server.on('close', () => db.$disconnect())
