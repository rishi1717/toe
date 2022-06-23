import { Server } from "socket.io"

export default (httpServer) => {
    const io = new Server(httpServer,{
        cors: {
            origin: "*",
        }
    })
    
    return io
}