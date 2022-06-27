import FriendRequests from "../../models/friendRequests.js"
import Users from "../../models/userModel.js"

const removeFriend = async (req, res) => {
	try {
		await Users.updateOne(
			{ _id: req.params.id },
			{ $pull: { friends: req.body.id} }
		)
		await Users.updateOne(
			{ _id: req.body.id },
			{ $pull: { friends: req.params.id } }
		)
        await FriendRequests.deleteMany({from: {$in: [req.params.id, req.body.id]}, to: {$in: [req.params.id, req.body.id]}})
		res.status(200).json({ message: "Friend removed!" })
	} catch (err) {
		console.log(err.message)
		res.status(500).json({ message: err.message })
	}
}

export default removeFriend
