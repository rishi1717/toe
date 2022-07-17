import Users from "../../models/userModel.js"

const getuserDetails = async (req, res) => {
	try {
		const user = await Users.findById(req.params.id)
		if (!user) {
			return res.status(404).json({ message: "User not found" })
		}
		return res.status(200).send({ user })
	} catch (err) {
		return res.status(500).send({ message: err.message })
	}
}

export default getuserDetails
