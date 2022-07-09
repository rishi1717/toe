import Levels from "../../models/levelModel.js"

const getLevels = async (req, res) => {
	try {
		const levels = await Levels.find(
			{},
			{ createdAt: 0, updatedAt: 0, __v: 0 }
		)
		res.json(levels)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

export default getLevels
