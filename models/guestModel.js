import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const guestSchema = new mongoose.Schema(
	{
		guestId: { type: String, unique: true, required: true },
        
	},
	{ timestamps: true }
)

const Guests = mongoose.model("guest", guestSchema)

export default Guests
