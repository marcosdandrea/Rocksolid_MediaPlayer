const { screen } = require("electron")

const getDisplays = (_, cb) => {
    cb(screen.getAllDisplays())
}

module.exports = {
    getDisplays
}