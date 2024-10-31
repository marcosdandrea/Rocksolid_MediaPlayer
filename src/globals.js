const CONSTANTS = {
    ENV_PRODUCTION: "production",
    ENV_DEVELOPMENT: "development",
}

const globals = {
    ENVIRONMENT: CONSTANTS.ENV_PRODUCTION,
    APP_URL: "http://localhost:3000",
    VITE_DEV_SERVER: "http://localhost:5173",
    SERVER_PORT: 3000,
    FILE_DIRECTORY: "/media"
}

module.exports = { globals, CONSTANTS }