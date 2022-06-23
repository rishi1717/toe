import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connect from "./models/index.js"
import userRoutes from "./routes/userRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import xss from "xss-clean"

dotenv.config()
connect
const app = express()
const port = process.env.PORT || 3000
const limiter = rateLimit({
	windowMs: 30 * 60 * 1000,
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
	message: "Too many requests from this IP, please try again after some time!",
})

app.use(xss())
app.use("/api", limiter)
app.use(helmet())
app.use(cors())
app.use(express.json({ limit: "50kb" }))
app.use(express.urlencoded({ extended: true }))

app.use("/api/googleAuth", authRoutes)
app.use("/api/users", userRoutes)

app.all("*", (req, res, next) => {
	const err = new Error(`Can't find ${req.originalUrl} on this server!`)
	err.status = "Endpoint not found"
	err.statusCode = 404
	next(err)
})

app.use((err, req, res, next) => {
	res.status(err.statusCode).send(err.status)
})

app.listen(port, (err) => {
	if (err) {
		console.log(err)
	} else {
		console.log(`Listening at http://localhost:${port}`)
	}
})
