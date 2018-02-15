const electron = require('electron')
const ipc = electron.ipcRenderer

module.exports = function vitelApplicationMenu(contactswindow,chatwindow,loginwindow, dialerwindow, mainWindow, app, appName) {

    const template = [
        {
            label: appName,
            submenu: [{
                label: "About " + appName,
                click: _ => {
                    console.log('clicked about')
                },
                role: 'about',
                accelerator: 'Cmd+A'
            }, {
                type: 'separator'
            },
            {
                label: "Quit",
                click: _ => {
                    loginwindow.setClosable(true)
                    mainWindow.setClosable(true)
                    dialerwindow.setClosable(true)
                    chatwindow.setClosable(true)
                    contactswindow.setClosable(true)
                    app.quit()
                },
                accelerator: 'Cmd+Q'
            }]
        }
    ]
    return template;
}