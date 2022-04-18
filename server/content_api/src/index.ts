import express from 'express'

const PORT = 8080
const app = express()

app.get('/properties')
app.post('/properties')
app.get('/properties/:property')
app.patch('/properties/:property')
app.delete('/properties/:property')

app.get('/properties/:property/collections')
app.post('/properties/:property/collections')
app.get('/properties/:property/collections/:collection')
app.patch('/properties/:property/collections/:collection')
app.delete('/properties/:property/collections/:collection')

app.get('/properties/:property/collections/:collection/items')
app.post('/properties/:property/collections/:collection/items')
app.get('/properties/:property/collections/:collection/items/:item')
app.patch('/properties/:property/collections/:collection/items/:item')
app.delete('/properties/:property/collections/:collection/items/:item')

app.listen(PORT, () => console.log(`Content API running on port ${PORT}`))
