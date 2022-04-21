import express from 'express'
import router from './routes'

const app = express()
app.use('/', router)

const PORT = process.env.PORT ?? 8080
app.listen(PORT, () => console.log(`Content API running on port ${PORT}`))
