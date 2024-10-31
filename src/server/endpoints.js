const express = require("express")
const path = require("path")
const { getMediaFileDirectory } = require("../fileManagement")

const bind = (server) => {

    const app_directory = path.join(__dirname, "..", "public")

    console.log(app_directory)

    server.use("/media", express.static(getMediaFileDirectory(__dirname)))
    server.use(express.static(app_directory))
    server.get("*", (req, res) => {
        res.sendFile(path.join(app_directory, "index.html"));
      });


}

module.exports = {bind}