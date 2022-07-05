import Guests from "../models/guestModel.js"
import Users from "../models/userModel.js"

export default (io, socket) => {
	let userId = null
	socket.on("connection", async (socket) => {
		try {
			userId = socket._id
			let user = await Users.findById(socket._id)
			if (!user) {
				user = await Guests.findById(socket._id)
				await Guests.updateOne(
					{ _id: socket._id },
					{ $set: { active: true } }
				)
			} else {
				await Users.updateOne(
					{ _id: socket._id },
					{ $set: { active: true } }
				)
				io.emit("onlineUpdate")
			}
		} catch (err) {
			console.log(err.message)
		}
	})

	socket.on("disconnection", async (socket) => {
		try {
			console.log(socket._id)
			await Users.updateOne({ _id: socket._id }, { $set: { active: false } })
			io.emit("onlineUpdate")
		} catch (err) {
			console.log(err.message)
		}
	})

	socket.on("disconnect", async () => {
		try {
			if (userId) {
				await Users.updateOne({ _id: userId }, { $set: { active: false } })
				io.emit("onlineUpdate")
			}
		} catch (err) {
			console.log(err.message)
		}
	})
}
