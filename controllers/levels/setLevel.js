import Levels from "../../models/levelModel.js"

const setLevel = async (req, res) => {
    try {
        const level = await Levels.create(req.body)
        res.status(201).json({ message: "Level created successfully", level })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export default setLevel