const fs = require('fs').promises
const path = require('path')
const { globals, CONSTANTS } = require('../globals')
const { app } = require("electron")
const { errorCodeToHumanReadable } = require('../errorHandling')
const Logger = require('../logger')
const logger = new Logger()

const readConfigFile = async () => {
    const configPath = globals.ENVIRONMENT == CONSTANTS.ENV_DEVELOPMENT
        ? path.join(__dirname, '..', '..', globals.FILE_DIRECTORY, 'config.json')
        : path.join(app.getAppPath("appData"), globals.FILE_DIRECTORY, 'config.json')

    const file = await fs.readFile(configPath, "utf-8")
    return JSON.parse(file)

}

const getDisplayPlayList = async (displayID) => {
    try {
        const config = await readConfigFile()
        console.log (config, config[displayID])
        return config[displayID]
    } catch (err) {
        logger.error(errorCodeToHumanReadable(err.code))
        return []
    }
}

module.exports = {
    getDisplayPlayList,
}

/*
3273520522
*/