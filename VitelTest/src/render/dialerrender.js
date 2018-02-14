console.log("dialer renderer")

const electron = require('electron')
const ipc = electron.ipcRenderer

document.getElementById('hide_dialer').addEventListener('click', _ => {
    console.log("hide hide_dialer")
    ipc.send('hide_dialer')
})