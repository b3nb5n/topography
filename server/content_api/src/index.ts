import express from 'express'
import deleteCollection from './collections/collection/delete'
import getCollection from './collections/collection/get'
import patchCollection from './collections/collection/patch'
import getCollections from './collections/get'
import postCollection from './collections/post'

const PORT = 8080
const app = express()

app.get('/properties')
app.post('/properties')
app.get('/properties/:property')
app.patch('/properties/:property')
app.delete('/properties/:property')

app.get('/properties/:property/collections', getCollections)
app.post('/properties/:property/collections', postCollection)
app.get('/properties/:property/collections/:collection', getCollection)
app.patch('/properties/:property/collections/:collection', patchCollection)
app.delete('/properties/:property/collections/:collection', deleteCollection)

app.get('/properties/:property/collections/:collection/items')
app.post('/properties/:property/collections/:collection/items')
app.get('/properties/:property/collections/:collection/items/:item')
app.patch('/properties/:property/collections/:collection/items/:item')
app.delete('/properties/:property/collections/:collection/items/:item')

app.listen(PORT, () => console.log(`Content API running on port ${PORT}`))
