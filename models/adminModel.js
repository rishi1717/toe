import mongoose from "mongoose"
import JWT from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

let adminSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			unique: true,
		},
		email: String,
		password: String,
	},
	{ timestamps: true }
)

adminSchema.methods.generateAuthToken = (admin) => {
	const token = JWT.sign(
		{ _id: admin._id, role: "admin" },
		process.env.JWT_SECRET,
		{
			expiresIn: "1d",
		}
	)
	return token
}

const Admin = mongoose.model("admin", adminSchema)

export default Admin
