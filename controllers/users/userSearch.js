import Users from "../../models/userModel.js"

const userSearch = async (req, res) => {
	try {
		const searchValue = req.query.search
        const users = await Users.find({ userName: { $regex: searchValue, $options: "i" } }, { createdAt:0, updatedAt:0, __v:0 })
        res.status(200).send(users)
	} catch (err) {
		res.status(500).send(err.message)
	}
}

export default userSearch
