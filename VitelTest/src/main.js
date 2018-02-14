const vitelApplicationMenu = require('./menus/appmenu.js')
const vitelContextMenu = require('./menus/contextmenu.js')
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

let loginwindowx 
let loginwindowy

app.on('ready', _ => {
    const appName = electron.app.getName()
    var screenElectron = electron.screen;
    var mainScreen = screenElectron.getPrimaryDisplay();
    loginwindowx = mainScreen.workAreaSize.width;
    loginwindowy = mainScreen.workAreaSize.height;

    console.log(mainScreen)

    intializeLoginwindow(loginwindowx,loginwindowy)

    initializeMainWindow()

    // const menu = Menu.buildFromTemplate(vitelApplicationMenu(app, appName))
    // Menu.setApplicationMenu(menu)

    //application context menu
    const tray = new Tray(path.join('src', 'images', 'trayicon.png'))
    tray.setToolTip('Vitel application')
    tray.setContextMenu(Menu.buildFromTemplate(vitelContextMenu(loginwindow, app, appName)))


})

ipc.on('login_user', _ => {
    console.log('do the login script')
    loginwindow.hide()
})

ipc.on('login_user_cancel', _ => {
    console.log('hide the window')
    loginwindow.hide()
})

function initializeMainWindow() {

    //Main page of the application
    mainWindow = new BrowserWindow({
        height: 400,
        width: 400,
        icon: path.join('src', 'images', 'trayicon.png'),
    })
    mainWindow.on('closed', _ => {
        console.log('closed')
        mainWindow = null; //make sure its garbage collected
    })
    let mainwindowurl = url.format({
        protocol: 'file',
        slashes: true,
        pathname: require('path').join(__dirname, 'pages', 'main.html')
    })

    mainWindow.loadURL(mainwindowurl)
}

function intializeLoginwindow(loginwindowx,loginwindowy) {
    // login window
    var xpos = loginwindowx - 400;
    var ypos = loginwindowy - 200;
    loginwindow = new BrowserWindow({
        height: 200,
        width: 400,
        show: false,
        autoHideMenuBar: true,
        maximizable: false,
        x: xpos,
        y: ypos,
        closable:false,
        minimizable:false,
        resizable:false,
        title:"Vitel login"
    })
    loginwindow.on('closed', _ => {
        console.log('loginwindow closed')
        loginwindow = null; //make sure its garbage collected
    })
    let loginwindowurl = url.format({
        protocol: 'file',
        slashes: true,
        pathname: require('path').join(__dirname, 'pages', 'login.html')
    })
    loginwindow.loadURL(loginwindowurl)
}

