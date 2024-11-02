const services = require("../services")
const io = require("socket.io")
const { globals } = require("../globals")
const systemServices = require("../services/system.services")
const displayServices = require("../services/display.services")

const bind = (httpServer) => {

    const mediaPlayerURL = new URL(globals.MEDIAPLAYER_DEV_SERVER)
    const commanderURL = new URL(globals.COMMANDER_DEV_SERVER)

    const socketServer = io(httpServer, {
        cors: {
          origin: [mediaPlayerURL.origin, commanderURL.origin],
          methods: ["GET", "POST"]
        }
      })

    socketServer.on("connection", (socket)=>{
      services.handleOnSocketConnects()

      socket.on("getMediaFiles", services.handleOnGetMediaFiles)
      socket.on("getAllMediaFiles", services.handlehandleOnGetAllMediaFiles)
      socket.on("disconnect", services.handleOnSocketDisconnects)
      socket.on("getSystemInformation", services.handleOnGetSystemInformation)

      socket.on("setDisplayPlaylist", displayServices.setPlaylist)
      socket.on("getSystemDisplays", systemServices.getDisplays)
    })

    globals.SOCKET_SERVER = socketServer
    
}

module.exports = { bind }