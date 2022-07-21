import sendMessage from "../controllers/matches/sendMessage.js"
import sendTournamentMessage from "../controllers/tournaments/sendTournamentMessage.js"
import Tournaments from "../models/tournamentModel.js"
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

	// disconnection
	socket.on("disconnect", async (data) => {
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
		setTimeout(() => {
			socket.in(sentTo).emit("moveMade", data)
		}, 300)
	})

	// friend req page
	socket.on("friendPage", async (data) => {
		socket.join(data)
		socket.emit("connected")
	})

	// match request
	socket.on(" ", async (data) => {
		socket.in(data.player2._id).emit("gotMatchRequest", data)
	})

	//tournament setup
	socket.on("setupTournament", (userData) => {
		socket.join(userData._id)
		socket.emit("connected")
	})

	socket.on("joinTournament", (room) => {
		socket.join(room)
	})

	//tournament Message
	socket.on("newTournamentMessage", async (newMessage) => {
		try {
			const tournament = await sendTournamentMessage(newMessage)

			socket.broadcast
				.to(newMessage.tournamentData._id)
				.emit("tournamentMessageRecieved", tournament)
		} catch (err) {
			console.log(err.message)
		}
	})

	//tournament start
	socket.on("startTournament", async (data) => {
		const tournament = await Tournaments.findOne({ _id: data }).populate(
			"remainingPlayers"
		)
		const players = tournament.remainingPlayers
		const scheduled = tournament.nextMatches.some((match) => {
			return match.status === "pending"
		})

		if (scheduled) {
			socket.broadcast.to(data).emit("tournamentStarted", tournament)
			console.log("tournament scheduled already")
			return
		}

		for (let i = 0; i < players.length; i += 2) {
			const match = {
				player1: players[i],
				player2: players[i + 1],
				tournament: tournament._id,
				status: "pending",
			}
			tournament.nextMatches.push(match)
		}
		await tournament.save()
		socket.broadcast.to(data).emit("tournamentStarted", tournament)
	})
}
