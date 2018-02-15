console.log("hide_contacts renderer")

const electron = require('electron')
const ipc = electron.ipcRenderer

document.getElementById('hide_contacts').addEventListener('click', _ => {
    console.log("hide hide_contacts")
    ipc.send('hide_contacts')
})