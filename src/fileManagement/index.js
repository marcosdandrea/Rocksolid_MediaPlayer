const fs = require('fs').promises
const multer = require('multer');
const path = require('path');
const { globals, CONSTANTS } = require('../globals');
const Logger = require("../logger");
const { errorCodeToHumanReadable } = require('../errorHandling');
const logger = new Logger()

const getMediaFileDirectory = (dirname) => {
    return globals.ENVIRONMENT == CONSTANTS.ENV_DEVELOPMENT
        ? path.join(dirname ?? __dirname, "..", "..", globals.FILE_DIRECTORY)
        : path.join(process.resourcesPath, globals.FILE_DIRECTORY)
}

const readConfigFile = async () => {
    try {
        const configPath = path.join(getMediaFileDirectory(), 'config.json')
        const file = await fs.readFile(configPath, "utf-8")
        return JSON.parse(file)
    } catch (err) {
        console.error(err)
        logger.error(errorCodeToHumanReadable(err.code))
        return {}
    }
}

const saveConfigFile = async (data) => {
    const dir = getMediaFileDirectory()
    const configPath = path.join(dir, 'config.json')
    await fs.writeFile(configPath, JSON.stringify(data, null, 2))
}

const getMediaFiles = async (displayID) => {
    try {
        const config = await readConfigFile()
        return config[displayID]
    } catch (err) {
        console.error(err)
        logger.error(errorCodeToHumanReadable(err.code))
        return []
    }
}

const getAllMediaFiles = async () => {
    try {
        const files = await fs.readdir(getMediaFileDirectory())
        return files.filter(file => file.endsWith('.webm') || file.endsWith('.mp4'))
    } catch (err) {
        console.error(err)
        logger.error(errorCodeToHumanReadable(err.code))
        return []
    }
}

const deleteMediaFile = async (req, res) => {
    const { file } = req.body
    try {
        if (!file)
            throw new Error('No se ha proporcionado el nombre del archivo')
        const config = await readConfigFile()
        const inUse = Object.keys(config)
            .find(displayID => config[displayID].find(filename => filename == file))
        if (inUse) {
            throw new Error(`El archivo ${file} está en uso por el display ${inUse}`)
        }
        const filePath = path.join(getMediaFileDirectory(), file)
        await fs.unlink(filePath)
        res.send()
    } catch (err) {
        console.error(err)
        logger.error(errorCodeToHumanReadable(err.code))
        res.status(423).send(err.message)
    }
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, getMediaFileDirectory());
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Filtro para aceptar solo archivos .webm
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'video/webm' || file.mimetype === 'video/mp4') {
        cb(null, true); // Acepta el archivo
    } else {
        cb(new Error('Solo se permiten archivos en formato .webm o .mp4'), false); // Rechaza el archivo
    }
};

// Configuración de multer
const uploadMediaFiles = multer({
    storage: storage,
    fileFilter: fileFilter
});

const createMediaConfig = async () => {
    const dir = getMediaFileDirectory();
    const configPath = path.join(dir, 'config.json');

    try {
        await fs.access(configPath);
        return;
    } catch {
    }

    try {
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(configPath, JSON.stringify({}), "utf-8");
    } catch (err) {
        console.error(err);
        logger.error(errorCodeToHumanReadable(err.code));
    }
};

createMediaConfig()

module.exports = {
    getMediaFiles,
    getMediaFileDirectory,
    readConfigFile,
    saveConfigFile,
    deleteMediaFile,
    getAllMediaFiles,
    uploadMediaFiles
}