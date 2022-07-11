import Admin from "../../models/adminModel.js"
import bcrypt from "bcrypt"

const adminLogin = async (req, res) => {
	try {
		const { email, password } = req.body
		let admin = await Admin.findOne({ email })
		if (!admin) {
			return res.status(400).json({
				message: "Admin not found",
			})
		}

		const isMatch = await bcrypt.compare(password, admin.password)
		if (!isMatch) {
			return res.status(400).json({ message: "Incorrect password" })
		}

		const token = admin.generateAuthToken(admin)
        admin = {...admin._doc, token, password: undefined}
		return res.status(200).json({
			message: "Admin logged in successfully",
			admin,
		})
	} catch (err) {
		console.log(err)
		res.status(500).send(err.message)
	}
}

export default adminLogin
