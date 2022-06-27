
export default (io, socket) => {
	socket.on("connection", (socket) => {
		console.log(socket)
	})
}