const deleteLevel = async (req, res) => {
    try {
        const level = await Levels.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Level deleted successfully", level })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export default deleteLevel
