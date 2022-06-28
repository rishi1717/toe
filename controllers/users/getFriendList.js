import Users from "../../models/userModel.js"

const getFriendList = async (req, res) => {
	try {
		const user = await Users.findById(req.params.id)
		const friends = await Users.find({ _id: { $in: user.friends } })
		res.status(200).json(friends)
	} catch (err) {
		console.log(err.message)
		res.status(500).send(err.message)
	}
}

export default getFriendList
