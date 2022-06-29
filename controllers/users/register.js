import Users from "../../models/userModel.js"
import joi from "joi"
import bcrypt from "bcrypt"

const register = async (req, res) => {
	try {
		const { error } = validate(req.body)
		if (error) {
			console.log(error.message)
			return res.status(400).send(error.details[0].message)
		}

		let user = await Users.findOne({
			userName: req.body.userName,
		})
		if (!user && req.body.email) {
			user = await Users.findOne({
				email: req.body.email,
			})
		}

		if (user) {
			return res.status(409).send("User already exists")
		}

		if (!req.body.email) {
			req.body.email = undefined
		}

		const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS))
		const hash = await bcrypt.hash(req.body.password, salt)

		await new Users({
			...req.body,
			password: hash,
			stats: [0, 0, 0, 0],
		}).save()

		res.status(201).send("User created successfully")
	} catch (err) {
		console.log(err.message)
		res.status(500).send(err.message)
	}
}

const validate = (data) => {
	const schema = joi.object({
		fullName: joi.string().min(2).required(),
		userName: joi.string().min(6).required(),
		email: joi.string().email().allow(""),
		password: joi.string().min(6).required(),
	})
	return schema.validate(data)
}

export default register
