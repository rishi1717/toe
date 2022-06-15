import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connect from './models/index.js'
dotenv.config()

connect
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Listening at http://localhost:${port}`)
    }
})