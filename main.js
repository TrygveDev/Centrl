// Check for updates
const { autoUpdater } = require("electron-updater")
autoUpdater.checkForUpdatesAndNotify()

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const ipc = ipcMain

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        minWidth: 700,
        minHeight: 575,
        minWidth: 700,
        minHeight: 575,
        maxWidth: 700,
        maxHeight: 575,
        // resizable: false,
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
    createWindow()

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
