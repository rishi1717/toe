import mongoose from "mongoose"

const guestSchema = new mongoose.Schema(
	{
		guestId: { type: String, unique: true, required: true },
		active: { type: Boolean, default: false },
		level: { type: Number, default: 0 },
	},
	{ timestamps: true }
)

guestSchema.index(
	{ createdAt: 1 },
	{
		expireAfterSeconds: 60 * 60 * 24,
		partialFilterExpression: { active: false },
	}
)

const Guests = mongoose.model("guest", guestSchema)

export default Guests
