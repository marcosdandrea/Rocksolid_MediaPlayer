const express = require("express");
const http = require("http")
const app = express();
const cors = require("cors")
const server = http.createServer(app)
const endpoints = require("./endpoints");
const socket = require("./socket")
const { globals } = require("../globals");
const Logger = require("../logger");
const logger = new Logger()

const corsOptions = {
    origin: true, // Permite cualquier dominio en desarrollo; para producción, cambia a un dominio específico.
    methods: ['GET', 'POST'], // Permite solo estos métodos
    allowedHeaders: ['Content-Type', 'Authorization', 'Range'], // Permite solo estos encabezados
    credentials: true // Permite el envío de cookies y credenciales de autenticación
};

app.use(cors(corsOptions))

endpoints.bind(app)
socket.bind(server)

server.listen(globals.SERVER_PORT, "0.0.0.0", () => {
    logger.info(`listening on ${globals.SERVER_PORT}`);
})