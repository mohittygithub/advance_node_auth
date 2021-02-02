require('dotenv').config({ path: './config.env' })
const express = require('express')
const connectDB = require('./config/db.js')
const authRoutes = require('./routes/auth-route.js')
const privateRoutes = require('./routes/private-route.js')
const errorHandler = require('./middleware/error.js')

connectDB()
const app = express()

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/private', privateRoutes)

// this must be last middleware
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () =>
  console.log(`server is listening on http://localhost:${PORT}`)
)

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err}`)
  server.close(() => process.exit(1))
})
