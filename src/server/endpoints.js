const express = require("express");
const path = require("path");
const fileManagement = require("../fileManagement")
const { getMediaFileDirectory, uploadMediaFiles } = require("../fileManagement");

//http://localhost:3000/mediaplayer/764325555

const bind = (server) => {
  const mediaplayer_directory = path.join(__dirname, "..", "mediaPlayerApp");
  const commander_directory = path.join(__dirname, "..", "commanderApp");

  server.post("/media", uploadMediaFiles.single("video"), (req, res) => {
    try {
      res.status(200).json({
        message: 'Archivo subido con éxito',
        file: req.file
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  server.delete("/media", fileManagement.deleteMediaFile)

  // Sirve archivos estáticos desde el directorio de medios
  server.use("/media", express.static(getMediaFileDirectory(__dirname)));

  // Sirve archivos estáticos desde commanderApp
  server.use("/commander", express.static(commander_directory));

  // Maneja la ruta para la aplicación commander
  server.get("/commander/", (req, res) => {
    res.sendFile(path.join(commander_directory, "index.html"));
  });

  // Sirve archivos estáticos desde commanderApp
  server.use("/mediaplayer", express.static(mediaplayer_directory));

  // Maneja la ruta para la aplicación commander
  server.get("/mediaplayer/:id", (req, res) => {
    res.sendFile(path.join(mediaplayer_directory, "index.html"));
  });


  // Manejo de otras rutas
  server.use((req, res) => {
    res.status(404).send("404 Not Found");
  });
};

module.exports = { bind };
