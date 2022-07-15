import Guests from "../models/guestModel.js"
import Users from "../models/userModel.js"

export default (io, socket) => {
	let userId = null


	socket.on("connection", async ({ _id }) => {
		try {
			userId = _id
			let user = await Users.findById(userId)
			if (!user) {
				user = await Guests.findById(userId)
				await Guests.updateOne({ _id: userId }, { $set: { active: true } })
			} else {
				await Users.updateOne(
					{ _id: userId },
					{ $set: { active: true, socketId: socket.id } }
				)
				io.emit("onlineUpdate")
			}
		} catch (err) {
			console.log(err.message)
		}
	})

	socket.on("disconnection", async (socket) => {
		try {
			await Users.updateOne({ _id: socket._id }, { $set: { active: false, socketId:"" } })
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

	socket.on("acceptMatch", ({ to }) => {
		try {
			console.log(socket.id, "id: ", to)
			io.emit("acceptMatch", {
				from: socket.id,
			})
		} catch (err) {
			console.log(err.message)
		}
	})

	socket.on('setup',(data)=>{
		socket.join(data._id)
		socket.emit('connected')
	})
}
