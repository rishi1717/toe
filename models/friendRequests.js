import mongoose from "mongoose"

const friendRequestSchema = new mongoose.Schema(
	{
		from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: { type: String, default: "pending" },
	},
	{ timestamps: true }
)

const FriendRequests = mongoose.model("friendRequest", friendRequestSchema)

export default FriendRequests
