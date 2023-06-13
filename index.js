const {app, BrowserWindow, ipcMain} = require('electron')
const database = require('./database.js')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 700,
        height: 120,
        resizable: false,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    ipcMain.on('insert-call', (event,data) => {
        const {name,entity,uf,city} = data
        database(name,entity,uf,city)
    })

    win.setMenu(null)

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if( BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') app.quit()
})