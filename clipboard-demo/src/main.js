const electron = require('electron')
const app = electron.app
const path = require('path')
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu

const Tray = electron.Tray
let mainWindow



app.on('ready', _ => {
    const appName = electron.app.getName()

    const tray = new Tray(path.join('src', 'trayicon.png'))
    tray.setToolTip('Tooltip for the context menu')
    tray.setContextMenu(contextMenu())


    logonWindow = new BrowserWindow({
        height: 400,
        width: 400
    })
    logonWindow.on('closed', _ => {
        logonWindow = null;
    })


    mainWindow = new BrowserWindow({
        height: 400,
        width: 400
    })

    mainWindow.on('closed', _ => {
        console.log('closed')
        mainWindow = null; //make sure its garbage collected
    })

    const menu = Menu.buildFromTemplate(appMenu(appName))
    Menu.setApplicationMenu(menu)
})


function appMenu(appName){
    const template = [
        {
            label: appName,
            submenu: [{
                label: "about " + appName,
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
    return template;
}

function contextMenu(){
    const ctxMenu = new Menu.buildFromTemplate([
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
    return ctxMenu
}