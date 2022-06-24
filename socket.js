
export default (io, socket) => {
	socket.on("test", (socket,num) => {
		console.log(socket,num)
	})
}