import Users from "../../models/userModel.js"
import joi from "joi"
import bcrypt from "bcrypt"

const login = async (req, res) => {
	try {
		const { error } = validate(req.body)
		if (error) {
			return res.status(400).send(error.details[0].message)
		}
		let user = await Users.findOne({
			userName: req.body.userName,
		},{ createdAt:0, updatedAt:0, __v:0 })
		if (!user) {
			return res.status(401).send("Invalid userName or password")
		}
		const password = await bcrypt.compare(req.body.password, user.password)
		if (!password) {
			return res.status(401).send("Invalid userName or password")
		}
		const token = user.generateToken(user)
        user.password = undefined
        user = {...user._doc, token}
		res.status(200).send({ user, message: "Login successful" })
	} catch (err) {
		res.status(500).send(err.message)
	}
}

const validate = (data) => {
	const schema = joi.object({
		userName: joi.string().required().label("userName"),
		password: joi.string().required().label("password"),
	})
	return schema.validate(data)
}
export default login
