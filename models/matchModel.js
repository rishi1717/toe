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
		playerXMoves: [{ type: Number}],
		playerOMoves: [{ type: Number}],
		player1Points: { type: Number, default: 0 },
		player2Points: { type: Number, default: 0 },
		pointsToWin: { type: Number, default: 1 },
	},
	{ timestamps: true }
)

const Matches = mongoose.model("match", matchSchema)

export default Matches
