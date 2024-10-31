const { globals, CONSTANTS } = require("../globals");

class Logger {
    constructor() {
        if (Logger.instance)
            return Logger.instance;

        Logger.instance = this;
    }

    #writeConsole(message) {
        if (globals.ENVIRONMENT != CONSTANTS.ENV_DEVELOPMENT) return;
        console.log(message);
    }

    async info(message) {
        this.#writeConsole(`[INFO] ${message}`);
    }

    async warn(message) {
        this.#writeConsole(`[WARN] ${message}`);
    }

    async error(message) {
        this.#writeConsole(`[ERROR] ${message}`);
    }
}

module.exports = Logger;
