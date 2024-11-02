const fileManagement = require("../fileManagement")
const { globals } = require("../globals")

const setPlaylist = async (props, cb) => {
    const {displayID, playlist} = props
    const config = await fileManagement.readConfigFile()
    config[displayID] = playlist
    console.log (config)
    await fileManagement.saveConfigFile(config)
    cb(true)
    globals.SOCKET_SERVER.emit("reloadMediaPlayer")
}

module.exports = {
    setPlaylist,
}