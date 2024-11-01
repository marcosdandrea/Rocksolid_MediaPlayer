const { version } = require('../../package.json');
const {networkInterfaces} = require("os")
const fileManagement = require("../fileManagement")
const Logger = require("../logger")
const logger = new Logger()

const handleOnSocketConnects = () => {
    logger.info("Connected")
}

const handleOnSocketDisconnects = () => {
    logger.info("Disconnected")
}

const handleOnGetMediaFiles = async (displayID, cb) => {
    cb(await fileManagement.getMediaFiles(displayID) || [])
}

const handleOnGetSystemInformation = async (_, cb) => {
    
    function getLocalIP() {
        let ip = []
        const interfaces = networkInterfaces();
        for (const name in interfaces) {
          for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) 
              ip.push(iface.address)
          }
        }
        return ip;
      }


    const path = fileManagement.getMediaFileDirectory()
    cb({
        version, 
        path, 
        ip: getLocalIP().join(", ")})
}

module.exports = {
    handleOnSocketConnects,
    handleOnSocketDisconnects,
    handleOnGetMediaFiles,
    handleOnGetSystemInformation
}