
const { globals, CONSTANTS } = require("./src/globals")

const options = process.argv

if (options.includes("--dev")) 
    globals.ENVIRONMENT = CONSTANTS.ENV_DEVELOPMENT

require("./src")