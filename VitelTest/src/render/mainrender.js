console.log("in main renderer")


const electron = require('electron')
const ipc = electron.ipcRenderer

document.getElementById('hide_main').addEventListener('click', _ => {
    console.log("hide main page")
    ipc.send('hide_main')
})