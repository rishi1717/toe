import FriendRequests from "../../models/friendRequests.js"

const rejectReq = async (req, res) => {
    try {
        const request = await FriendRequests.findById(req.params.id)
        if (!request) {
            throw new Error("Request not found")
        }
        await FriendRequests.updateOne(
            { _id: req.params.id },
            { $set: { status: "rejected" } }
        )
        res.status(200).json({ message: "Friend request rejected!" })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
}

export default rejectReq