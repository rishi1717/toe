import FriendRequests from "../../models/friendRequests.js"

const getRequests = async (req, res) => {
	try {
		const requests = await FriendRequests.find({ to: req.params.id, status:'pending' }).populate("from")
        res.status(200).json(requests)
	} catch (err) {
		console.log(err.message)
		res.status(500).json({ message: "Something went wrong!" })
	}
}

export default getRequests
