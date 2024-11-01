const fs = require('fs').promises
const path = require('path');
const { globals, CONSTANTS } = require('../globals');
const Logger = require("../logger");
const { errorCodeToHumanReadable } = require('../errorHandling');
const logger = new Logger()

const getMediaFileDirectory = (dirname) => {
    return globals.ENVIRONMENT == CONSTANTS.ENV_DEVELOPMENT
    ? path.join(dirname ?? __dirname, "..", "..", globals.FILE_DIRECTORY)
    : path.join(process.resourcesPath, globals.FILE_DIRECTORY)
}

const readConfigFile = async () => {
    const dir = getMediaFileDirectory(__dirname)
    const configPath = path.join(dir, 'config.json')
    const file = await fs.readFile(configPath, "utf-8")
    return JSON.parse(file)
}

const getMediaFiles = async (displayID) => {
    try {
        const config = await readConfigFile()
        return config[displayID]
    } catch (err) {
        console.error(err)
        logger.error(errorCodeToHumanReadable(err.code))
        return []
    }
}

module.exports = { getMediaFiles, getMediaFileDirectory, readConfigFile }