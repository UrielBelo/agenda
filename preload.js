const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    insertCall: (obj) => ipcRenderer.send('insert-call', obj)
})