import mongoose from "mongoose"

const levelSchema = new mongoose.Schema(
	{
		name: { type: String, unique: true, required: true },
        entryFee: Number,
        winningAmount: Number,
        pointsToWin: Number,
	},
	{ timestamps: true }
)

const Levels = mongoose.model("level", levelSchema)

export default Levels
