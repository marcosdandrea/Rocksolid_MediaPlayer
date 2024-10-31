const path = require("path")
const { BrowserWindow } = require("electron")
const { globals, CONSTANTS } = require("../globals")

const launchPlayerWindow = (display) => {
    const window = new BrowserWindow({
        fullscreen: true,
        x: display.bounds.x,
        y: display.bounds.y,
        frame: false,
        show: false,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    window.setMenu(null)
    const url = globals.ENVIRONMENT == CONSTANTS.ENV_PRODUCTION
    ? globals.APP_URL
    : globals.VITE_DEV_SERVER
    window.loadURL(path.join(url, String(display.id)))

    if (globals.ENVIRONMENT == CONSTANTS.ENV_DEVELOPMENT)
        window.webContents.openDevTools()

    window.webContents.on("did-finish-load", () => {
        window.show()
        window.setAlwaysOnTop(true, "dock")
    })
}

module.exports = { launchPlayerWindow }