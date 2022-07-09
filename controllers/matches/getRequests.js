import Matches from "../../models/matchModel.js"

const getRequests = async (req, res) => {
    try{
        const userId = req.params.id
        const matches = await Matches.find({player2: userId, status: "requested"})
        res.status(200).json(matches)
    }catch(err){
        console.log(err.message)
        res.status(500).send(err.message)
    }
}

export default getRequests