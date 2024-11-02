const Logger = require("./logger")
const logger = new Logger()
const { app } = require("electron");

logger.info("Starting")

const entryPoint = async () => {

    logger.info("Starting Server...")
    await import("./server/index.js")

    logger.info("Starting Screen Manager")
    await import("./screenManager/index.js")

}


app.whenReady()
    .then(entryPoint)


app.on("window-all-closed", () => {
    logger.info("Quit")
    app.quit();
});