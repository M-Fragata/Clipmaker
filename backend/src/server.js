import express from "express"
import cors from 'cors'

import { routes } from "./routes/index.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use(routes)

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})