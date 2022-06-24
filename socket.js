
export default (io, socket) => {
    console.log("Socket connected")
	socket.on("test", (socket,num) => {
		console.log(socket,num)
	})
}