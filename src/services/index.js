const { version } = require('../../package.json');
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

const handleOnGetSystemVersion = async (_, cb) => {
    const path = fileManagement.getMediaFileDirectory()
    cb({version, path})
}

module.exports = {
    handleOnSocketConnects,
    handleOnSocketDisconnects,
    handleOnGetMediaFiles,
    handleOnGetSystemVersion
}