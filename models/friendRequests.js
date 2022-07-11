import mongoose from "mongoose"

const friendRequestSchema = new mongoose.Schema({
	from: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
	to: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
	status: { type: String, default: "pending" },
	date: { type: Date, default: Date.now() },
})

friendRequestSchema.index({ date: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 })

const FriendRequests = mongoose.model("friendRequest", friendRequestSchema)

export default FriendRequests
