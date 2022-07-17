import sendMessage from "../controllers/matches/sendMessage.js"
import Users from "../models/userModel.js"

export default (io, socket) => {
	let userId = null

	//Connection
	socket.on("online", async (data) => {
		userId = data._id
		await Users.findOneAndUpdate(
			{ _id: data._id },
			{ $set: { active: true } },
			{ new: true }
		)
		socket.broadcast.emit("onlineUpdate")
	})

	//match setup
	socket.on("setup", (userData) => {
		socket.join(userData._id)
		socket.emit("connected")
	})

	//joining match
	socket.on("joinMatch", (room) => {
		socket.join(room)
	})

	//sending message
	socket.on("newMessage", async (newMessage) => {
		const match = await sendMessage(newMessage)

		if (newMessage.matchData.player1._id !== newMessage.sender) {
			socket
				.in(newMessage.matchData.player1._id)
				.emit("messageRecieved", match)
		} else if (newMessage.matchData.player2._id !== newMessage.sender) {
			socket
				.in(newMessage.matchData.player2._id)
				.emit("messageRecieved", match)
		}
	})

	// making match move
	socket.on("makeMove", async (data) => {
		const sentTo =
			data.match.player1._id === data.user
				? data.match.player2._id
				: data.match.player1._id
		socket.in(sentTo).emit("moveMade", data)
	})

	// disconnection
	socket.on("disconnect", async () => {
		try {
			if (userId) {
				let user = await Users.updateOne(
					{ _id: userId },
					{ $set: { active: false } },
					{ new: true }
				)
				socket.broadcast.emit("onlineUpdate")
			}
		} catch (err) {
			console.log(err.message)
		}
	})
	socket.on("disconnection", async () => {
		try {
			if (userId) {
				let user = await Users.updateOne(
					{ _id: userId },
					{ $set: { active: false } },
					{ new: true }
				)
				socket.broadcast.emit("onlineUpdate")
			}
		} catch (err) {
			console.log(err.message)
		}
	})

	// friend req page
	socket.on("friendPage", async (data) => {
		socket.join(data)
		socket.emit("connected")
	})

	// match request
	socket.on("matchRequest", async (data) => {
		console.log("matchRequest", data)
		socket.in(data.player2._id).emit("gotMatchRequest", data)
	})
}
