import FriendRequests from "../../models/friendRequests.js"

const getRequestsSent = async (req, res) => {
	try {
		const requests = await FriendRequests.find({
			from: req.params.id,
			status: "pending",
		}).populate("to")
		res.status(200).json(requests)
	} catch (err) {
		console.log(err.message)
		res.status(500).json({ message: "Something went wrong!" })
	}
}

export default getRequestsSent
