const windowManager = require("../windowManager")
const { screen } = require('electron');

const launchDisplay = (display) => {
    windowManager.launchPlayerWindow(display)
}

screen.on('display-added', (event, newDisplay) => {
    console.log('Monitor conectado:', newDisplay);
});

// Detectar cuando se desconecta un monitor
screen.on('display-removed', (event, oldDisplay) => {
    console.log('Monitor desconectado:', oldDisplay);
});

screen.getAllDisplays().forEach(launchDisplay)