const electron = require('electron')
const app = electron.app

const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
let mainWindow

app.on('ready', _ => {
    console.log('ready')
    mainWindow = new BrowserWindow({
        height: 400,
        width: 400
    })

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
    mainWindow.on('closed', _ => {
        console.log('closed')
        mainWindow = null; //make sure its garbage collected
    })

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
})
