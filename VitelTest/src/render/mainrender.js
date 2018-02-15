console.log("in main renderer")


const electron = require('electron')
const ipc = electron.ipcRenderer

document.getElementById('hide_main').addEventListener('click', _ => {
    ipc.send('hide_main')
})

document.getElementById('toggle_contacts_main').addEventListener('click', _ => {
    ipc.send('toggle_contacts_main')
})
document.getElementById('toggle_login_main').addEventListener('click', _ => {
    ipc.send('toggle_login_main')
})
document.getElementById('toggle_chat_main').addEventListener('click', _ => {
    ipc.send('toggle_chat_main')
})
document.getElementById('toggle_dialer_main').addEventListener('click', _ => {
    ipc.send('toggle_dialer_main')
})


