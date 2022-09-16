// Modules to control application life and create native browser window
const log = require('electron-log');
const { autoUpdater } = require("electron-updater");
const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')
const ipc = ipcMain

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        maxWidth: 800,
        maxHeight: 600,
        frame: false,
        autoHideMenuBar: true,
        icon: __dirname + `/build/icons/icon.png`,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // and load the index.html of the app.
    mainWindow.loadFile('app/index.html')

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Menu events
    ipc.on('closeApp', () => {
        mainWindow.close()
    })
    ipc.on('minimizeApp', () => {
        mainWindow.minimize()
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// Auto updater
let win;

function sendStatusToWindow(text) {
    log.info(text);
    win.webContents.send('message', text);
}
function createDefaultWindow() {
    win = new BrowserWindow({
        width: 400,
        height: 300,
        minWidth: 400,
        minHeight: 300,
        maxWidth: 400,
        maxHeight: 300,
        resizable: false,
        frame: false,
        titleBarOverlay: {
            color: '#23272A',
            symbolColor: '#fff'
        },
        icon: __dirname + `/build/icons/icon.png`,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    // win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    });
    win.loadURL(`file://${__dirname}/updater.html#v${app.getVersion()}`);
    return win;
}
autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
    sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
    sendStatusToWindow('Newest version installed.');
    win.close();
    createWindow()
})
autoUpdater.on('error', (err) => {
    sendStatusToWindow('Error in auto-updater. ' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
    sendStatusToWindow("Downloaded " + Math.round(progressObj.percent) + "%");
})
autoUpdater.on('update-downloaded', (info) => {
    sendStatusToWindow('Update downloaded');
    // win.webContents.send('button');
    autoUpdater.quitAndInstall(false, true);
});
// ipc.on('update', () => {
//     autoUpdater.quitAndInstall(false, true);
// })
app.on('ready', function () {
    createDefaultWindow();
    autoUpdater.checkForUpdates();
    // UNCOMMENT IF NPM START IS USED
<<<<<<< Updated upstream
    // win.close();
    // createWindow();
=======
    win.close();
    createWindow()
>>>>>>> Stashed changes
});