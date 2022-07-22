import mongoose from "mongoose"

const tournamentSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	noOfPlayers: { type: Number, required: true },
	playersJoined: { type: Number, default: 0 },
	eliminatedPlayers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
	remainingPlayers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
	closed: { type: Boolean, default: false },
	pointsToWin: { type: Number, required: true },
	entryFee: { type: Number, required: true },
	winnerAmount: { type: Number, required: true },
	runnerUpAmount: { type: Number, required: true },
	income: { type: Number, required: true },
	status: { type: String, required: true },
	tournamentDate: { type: Date, required: true },
	players: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
	messages: [{}],
	nextMatches: [{}],
	matches: [{}],
})

tournamentSchema.index(
	{ tournamentDate: 1 },
	{ expireAfterSeconds: 60 * 60 * 24 }
)

const Tournaments = mongoose.model("tournament", tournamentSchema)

export default Tournaments
