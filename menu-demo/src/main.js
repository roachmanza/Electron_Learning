const electron = require('electron')
const app = electron.app

const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu

app.on('ready', _ => {
    console.log('ready')
    new BrowserWindow()

    const name = electron.app.getName()
    const template = [
        {
            label: name,
            submenu: [{
                label: "about " + name,
                click: _ => {
                    console.log('clicked')
                },
                role: 'about'
            }, {
                type: 'separator'
            }, {
                label: "quit ",
                click: _ => {
                    app.quit()
                },
                accelerator: 'Cmd+Q'
            }]
        }
    ]


    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
})
