import Users from "../../models/userModel.js"

const userSearch = async (req, res) => {
	try {
		const searchValue = req.query.search
		const users = await Users.find(
			{
				$or: [
					{ userName: { $regex: searchValue, $options: "i" } },
					{
						fullName: { $regex: searchValue, $options: "i" },
					},
				],
			},
			{ createdAt: 0, updatedAt: 0, __v: 0 }
		)
		res.status(200).send(users)
	} catch (err) {
		console.log(err.message)
		res.status(500).send(err.message)
	}
}

export default userSearch
