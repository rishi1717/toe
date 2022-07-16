import sendMessage from "../controllers/matches/sendMessage.js"

export default (io, socket) => {
	socket.on("setup", (userData) => {
		socket.join(userData._id)
		console.log(`${userData._id} has joined`)
		socket.emit("connected")
	})

	socket.on("joinMatch", (room) => {
		socket.join(room)
		console.log(`joined the room ${room}`)
	})

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
}
