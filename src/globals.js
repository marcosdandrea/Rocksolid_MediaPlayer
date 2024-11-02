const CONSTANTS = {
    ENV_PRODUCTION: "production",
    ENV_DEVELOPMENT: "development",
}

const globals = {
    ENVIRONMENT: CONSTANTS.ENV_PRODUCTION,
    SOCKET_SERVER: null,
    MEDIAPLAYER_URL: "http://localhost:3000/mediaplayer",
    MEDIAPLAYER_DEV_SERVER: "http://localhost:5173/mediaplayer",
    COMMANDER_URL: "http://localhost:3000/commander",
    COMMANDER_DEV_SERVER: "http://localhost:5174/commander",
    SERVER_PORT: 3000,
    FILE_DIRECTORY: "/media"
}

module.exports = { globals, CONSTANTS }