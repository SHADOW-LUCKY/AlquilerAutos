import DBconnection from './src/config/mongo.js'
import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import personasRoutes from './src/routes/personas.routes.js'
import autosRoutes from './src/routes/autos.routes.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(morgan('dev'))

const port = process.env.PORT

app.use('/personas', personasRoutes)
app.use('/autos', autosRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})