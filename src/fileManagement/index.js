const path = require('path');
const { app } = require("electron")
const { globals, CONSTANTS } = require('../globals');
const odm = require("../odm")

const getMediaFileDirectory = (dirname) => {
    return globals.ENVIRONMENT == CONSTANTS.ENV_DEVELOPMENT
    ? path.join(dirname, "..", "..", globals.FILE_DIRECTORY)
    : path.join(app.getAppPath("appData"), globals.FILE_DIRECTORY)
}

const getMediaFiles = async (displayID) => {

    return await odm.getDisplayPlayList(displayID)

}

module.exports = { getMediaFiles, getMediaFileDirectory }