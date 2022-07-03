import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const userSchema = new mongoose.Schema(
	{
		fullName: String,
		email: { type: String, unique: true, sparse: true },
		userName: { type: String, unique: true, required: true },
		password: { type: String, minlength: 6 },
		active: { type: Boolean, default: false },
		friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
		matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "match" }],
		tournaments: [
			{ type: mongoose.Schema.Types.ObjectId, ref: "tournament" },
		],
		matchesPlayed: { type: Number, default: 0 },
		matchesWon: { type: Number, default: 0 },
		matchesLost: { type: Number, default: 0 },
		winRatio: { type: Number, default: 0 },
		tournamentsWon: { type: Number, default: 0 },
		level: { type: Number, default: 0 },
		amountWon: { type: Number, default: 0 },
		amountSpent: { type: Number, default: 0 },
		walletAmount: { type: Number, default: 0 },
		referalId: { type: String, unique: true, sparse: true },
		referalCount: { type: Number, default: 0 },
		referalAmount: { type: Number, default: 0 },
	},
	{ timestamps: true }
)

userSchema.methods.generateToken = (user) => {
	const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
		expiresIn: "1d",
	})
	return token
}

const Users = mongoose.model("user", userSchema)

export default Users
