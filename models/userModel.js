import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const userSchema = new mongoose.Schema(
	{
		fullName: String,
		email: { type: String, unique: true, sparse: true },
		userName: { type: String, unique: true, required: true },
		password: String,
	},
	{ timestamps: true }
)

userSchema.methods.generateToken = (user) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
    return token
}

const Users = mongoose.model("user", userSchema)

export default Users