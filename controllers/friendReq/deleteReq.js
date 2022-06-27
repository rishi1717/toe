import FriendRequests from "../../models/friendRequests.js"

const cancelRequest = async (req, res) => {
	try {
		const ressss = await FriendRequests.findOneAndDelete({
			_id: req.params.id,
		})
		res.status(200).json({ message: "Friend request deleted!" })
	} catch (err) {
		console.log(err.message)
		res.status(500).json({ message: err.message })
	}
}

export default cancelRequest
