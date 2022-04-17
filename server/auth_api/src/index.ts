import express from 'express'

const PORT = 5500
const app = express()
app.listen(PORT, () => console.log(`Content API running on port ${PORT}`))
