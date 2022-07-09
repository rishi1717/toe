import Levels from "../../models/levelModel.js"

const updateLevel = async (req, res) => {
    try {
        const level = await Levels.findByIdAndUpdate(req.params.id,{$set: req.body})
        res.status(200).json({ message: "Level updated successfully", level })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export default updateLevel