import express from 'express'
import router from './routes'

const app = express()
app.use('/', router)

const PORT = process.env.PORT ?? 5500
app.listen(PORT, () => console.log(`Auth API running on port ${PORT}`))
