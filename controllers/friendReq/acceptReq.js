import FriendRequests from "../../models/friendRequests.js"
import Users from "../../models/userModel.js"

const acceptReq = async (req, res) => {
	try {
		const request = await FriendRequests.findById(req.params.id)
		if (!request) {
			throw new Error("Request not found")
		}
		await FriendRequests.updateOne(
			{ _id: req.params.id },
			{ $set: { status: "accepted" } }
		)
		await Users.updateOne(
			{ _id: request.from },
			{ $push: { friends: request.to } }
		)
		await Users.updateOne(
			{ _id: request.to },
			{ $push: { friends: request.from } }
		)
		res.status(200).json({ message: "Friend request accepted!" })
	} catch (err) {
		console.log(err.message)
		res.status(500).json({ message: err.message })
	}
}

export default acceptReq
