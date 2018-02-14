const electron = require('electron')
const url = require('url')
const path = require('path')
const app = electron.app
const ipc = electron.ipcMain
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const Tray = electron.Tray


let mainWindow
let logonWindow
let dialerwindow

let mainwindow_x
let mainwindow_y

app.on('ready', _ => {
    const appName = electron.app.getName()
    var screenElectron = electron.screen;
    var mainScreen = screenElectron.getPrimaryDisplay();
    mainwindow_x = mainScreen.workAreaSize.width;
    mainwindow_y = mainScreen.workAreaSize.height;



    //Main page of the application
    mainWindow = new BrowserWindow({
        height: 200,
        width:  mainwindow_x,
        x: 1,
        y: mainwindow_y - 200,
        icon: path.join('src', 'images', 'trayicon.png'),
        closable: false,
        minimizable: false,
        maximizable: false,
        resizable: false,
        title: "Vitel lite"
    })
    mainWindow.on('closed', _ => {
        console.log('closed')
        mainWindow = null; //make sure its garbage collected
        logonWindow = null;
        mainwindow_x = null;
        mainwindow_y = null;
    })
    let mainwindowurl = url.format({
        protocol: 'file',
        slashes: true,
        pathname: require('path').join(__dirname, 'pages', 'main.html')
    })
    mainWindow.loadURL(mainwindowurl)
    // const menu = Menu.buildFromTemplate(vitelApplicationMenu(app, appName))
    // Menu.setApplicationMenu(menu)

    // dialer window
    dialerwindow = new BrowserWindow({
        height: 200,
        width: 400,
        autoHideMenuBar: true, 
        show: true,       
        x: mainwindow_x - 400,
        y: mainwindow_y - 400,
        closable: false,
        minimizable: false,
        maximizable: false,
        resizable: false,
        title: "Vitel dialer"
    })
    dialerwindow.on('closed', _ => {
        console.log('dialerwindow closed')
        dialerwindow = null; //make sure its garbage collected
    })
    dialerwindow.loadURL(url.format({
        protocol: 'file',
        slashes: true,
        pathname: require('path').join(__dirname, 'pages', 'dialer.html')
    }))

    // login window
    loginwindow = new BrowserWindow({
        height: 200,
        width: 400,
        
        autoHideMenuBar: true, 
        show: true,       
        x:  mainwindow_x - 400,
        y: mainwindow_y - 600,
        closable: false,
        minimizable: false,
        maximizable: false,
        resizable: false,
        title: "Vitel login"
    })
    loginwindow.on('closed', _ => {
        console.log('loginwindow closed')
        loginwindow = null; //make sure its garbage collected
    })
    loginwindow.loadURL(url.format({
        protocol: 'file',
        slashes: true,
        pathname: require('path').join(__dirname, 'pages', 'login.html')
    }))

    //application context menu
    const tray = new Tray(path.join('src', 'images', 'trayicon.png'))
    tray.setToolTip('Vitel application')
    const ctxtemplate = [
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
            label: 'About',
            click: _ => {
                console.log('About')
            },
            role: 'about',
        },
        {
            type: 'separator'
        },
        {
            label: 'Quit',
            click: _ => {
                loginwindow.setClosable(true)
                mainWindow.setClosable(true)
                dialerwindow.setClosable(true)                
                app.quit()
            },
        }
    ]
    let trayCtxMenu = Menu.buildFromTemplate(ctxtemplate)
    tray.setContextMenu(trayCtxMenu)
})

app.on('window-all-closed', () => {
    console.log("closed killed....");
    app.quit()
})

ipc.on('login_user', _ => {
    console.log('do the login script')
    loginwindow.hide()
})

ipc.on('login_user_cancel', _ => {
    console.log('hide the window')
    loginwindow.hide()
})


ipc.on('hide_main', _ => {
    console.log('hide the window')
    mainWindow.hide()
})

ipc.on('hide_dialer', _ => {
    console.log('hide the window')
    dialerwindow.hide()
})