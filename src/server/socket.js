const services = require("../services")
const io = require("socket.io")
const { globals } = require("../globals")

const bind = (httpServer) => {
    const socketServer = io(httpServer, {
        cors: {
          origin: globals.VITE_DEV_SERVER,
          methods: ["GET", "POST"]
        }
      })

    socketServer.on("connection", (socket)=>{
      services.handleOnSocketConnects()

      socket.on("getMediaFiles", services.handleOnGetMediaFiles)
      socket.on("disconnect", services.handleOnSocketDisconnects)
      socket.on("getSystemVersion", services.handleOnGetSystemVersion)
    })
    
}

module.exports = { bind }