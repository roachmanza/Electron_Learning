console.log("dialer renderer")

const electron = require('electron')
const ipc = electron.ipcRenderer

document.getElementById('hide_chat').addEventListener('click', _ => {
    console.log("hide hide_chat")
    ipc.send('hide_chat')
})