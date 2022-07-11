import Admin from "../../models/adminModel.js"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()

const createAdmin = async (req, res) => {
	try {
		const { name, email, password } = req.body
		const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS))
		const hash = await bcrypt.hash(password, salt)
		const admin = new Admin({
			name,
			email,
			password: hash,
		})
		await admin.save()
		return res.status(200).send({ message: "Admin created successfully" })
	} catch (err) {
		console.log(err)
		res.status(500).send(err.message)
	}
}

export default createAdmin
