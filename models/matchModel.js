import mongoose from "mongoose"

const matchSchema = new mongoose.Schema(
	{
		player1: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		player2: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		winner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		entryFee: Number,
		winningAmount: Number,
	},
	{ timestamps: true }
)

const Matches = mongoose.model("match", matchSchema)

export default Matches
