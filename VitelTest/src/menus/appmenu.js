const electron = require('electron')
const ipc = electron.ipcRenderer

module.exports = function vitelApplicationMenu(loginwindow, dialerwindow, mainWindow, app, appName) {

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
                label: 'Main',
                click: _ => {
                    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
                }
            },
            {
                label: 'Dialer',
                click: _ => {
                    dialerwindow.isVisible() ? dialerwindow.hide() : dialerwindow.show()
                }
            },
            {
                label: 'Login',
                click: _ => {
                    loginwindow.isVisible() ? loginwindow.hide() : loginwindow.show()
                }
            },
            {
                type: 'separator'
            },
            {
                label: "Quit",
                click: _ => {
                    loginwindow.setClosable(true)
                    mainWindow.setClosable(true)
                    dialerwindow.setClosable(true)
                    app.quit()
                },
                accelerator: 'Cmd+Q'
            }]
        }
    ]
    return template;
}