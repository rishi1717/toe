import mongoose from "mongoose"

const matchSchema = new mongoose.Schema(
	{
		player1: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
		player2: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
		winner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
		status: { type: String, default: "requested" },
		entryFee: { type: Number, default: 0 },
		income: { type: Number, default: 0 },
		winningAmount: { type: Number, default: 0 },
		playerXMoves: [{ type: Number, unique: true }],
		playerOMoves: [{ type: Number, unique: true }],
	},
	{ timestamps: true }
)

const Matches = mongoose.model("match", matchSchema)

export default Matches
