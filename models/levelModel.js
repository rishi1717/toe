import mongoose from "mongoose"

const levelSchema = new mongoose.Schema(
	{
		name: { type: String, unique: true, required: true },
		entryFee: { type: Number, required: true },
		winningAmount: { type: Number, required: true },
		pointsToWin: { type: Number, required: true },
	}
)

const Levels = mongoose.model("level", levelSchema)

export default Levels
