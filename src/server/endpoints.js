const express = require("express")
const path = require("path")
const { getMediaFileDirectory } = require("../fileManagement")

const bind = (server) => {

    const app_directory = path.join(__dirname, "..", "..", "mediaPlayerApp", "dist")

    server.use("/media", express.static(getMediaFileDirectory(__dirname)))
    server.use("/", express.static(path.join(app_directory)))


}

module.exports = {bind}