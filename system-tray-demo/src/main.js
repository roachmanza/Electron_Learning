const electron = require('electron')
const app = electron.app
const path = require('path')
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu

const Tray = electron.Tray
let mainWindow



app.on('ready', _ => {
    const name = electron.app.getName()

    const tray = new Tray(path.join('src', 'trayicon.png'))
    const contextMenu = new Menu.buildFromTemplate([
        {
            label: 'About',
            click: _ => {
                console.log('About')
            }
        },
        {
            label: 'Other',
            click: _ => {
                console.log('Other')
            }
        },
        {
            label: 'Quit',
            click: _ => {
                app.quit()
            }
        }
    ])
    tray.setToolTip('Tooltip for the context menu')
    tray.setContextMenu(contextMenu)



    console.log('ready')
    mainWindow = new BrowserWindow({
        height: 400,
        width: 400
    })


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
