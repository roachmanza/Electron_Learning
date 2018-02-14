const electron = require('electron')
const ipc = electron.ipcRenderer

module.exports = function getApplicationMenu(app, appName) {

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
            }, {
                label: "Quit",
                click: _ => {
                    app.quit()
                },
                accelerator: 'Cmd+Q'
            }]
        }
    ]
    return template;
}