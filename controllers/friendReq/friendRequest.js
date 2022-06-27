import FriendRequests from "../../models/friendRequests.js"

const friendRequest = async (req, res) => {
	try {
		const { from, to } = req.body
		const friendRequest = new FriendRequests({ from, to, status: "pending" })
		await friendRequest.save()
		res.status(200).json({ message: "Friend request sent!" })
	} catch (err) {
		console.log(err.message)
	}
}

export default friendRequest
