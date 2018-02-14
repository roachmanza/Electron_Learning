console.log("in login renderer")



const electron = require('electron')
const ipc = electron.ipcRenderer

document.getElementById('login_user').addEventListener('click', _ => {
    console.log("login_user clicked")
    ipc.send('login_user')
})

document.getElementById('login_user_cancel').addEventListener('click', _ => {
    console.log("login_user_cancel clicked")
    ipc.send('login_user_cancel')
})
