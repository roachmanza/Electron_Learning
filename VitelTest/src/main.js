const vitelApplicationMenu = require('./menus/appmenu')
const vitelContextMenu = require('./menus/contextmenu')
const vitelApplicationWindow = require('./window/mainwindow')
const vitelDialerWindow = require('./window/dialerwindow')
const vitelLoginWindow = require('./window/loginwindow')
const vitelChatWindow = require('./window/chatwindow')
const vitelContactsWindow = require('./window/contactswindow')

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
let chatwindow
let contactswindow

let mainwindow_x
let mainwindow_y

app.on('ready', _ => {
    const appName = electron.app.getName()
    var screenElectron = electron.screen;
    var mainScreen = screenElectron.getPrimaryDisplay();
    mainwindow_x = mainScreen.workAreaSize.width;
    mainwindow_y = mainScreen.workAreaSize.height;

    mainWindow = vitelApplicationWindow(path,url, BrowserWindow,mainwindow_x,mainwindow_y);
    
    dialerwindow = vitelDialerWindow(path,url, BrowserWindow,mainwindow_x,mainwindow_y);


    loginwindow = vitelLoginWindow(path,url, BrowserWindow,mainwindow_x,mainwindow_y);

    chatwindow = vitelChatWindow(path,url, BrowserWindow,mainwindow_x,mainwindow_y);

    contactswindow= vitelContactsWindow(path,url, BrowserWindow,mainwindow_x,mainwindow_y);
    
    // Application menu
    const menu = Menu.buildFromTemplate(vitelApplicationMenu(contactswindow,chatwindow,loginwindow, dialerwindow, mainWindow,app, appName))
    Menu.setApplicationMenu(menu)

    // Application Context menu in the tray
    const tray = new Tray(path.join('src', 'images', 'trayicon.png'))
    tray.setToolTip('Vitel application')  
    let trayCtxMenu = Menu.buildFromTemplate(vitelContextMenu(contactswindow,chatwindow,loginwindow,dialerwindow,mainWindow, app, appName))
    tray.setContextMenu(trayCtxMenu)
})

//Application events
app.on('window-all-closed', () => {
    console.log("closed killed....");
    app.quit()
})

//logon page events
ipc.on('login_user', _ => {
    console.log('do the login script')
    loginwindow.hide()
})

ipc.on('login_user_cancel', _ => {
    console.log('hide the window')
    loginwindow.hide()
})

//dialer events
ipc.on('hide_dialer', _ => {
    console.log('hide the window')
    dialerwindow.hide()
})

//main window events
ipc.on('hide_main', _ => {
    console.log('hide the window')
    mainWindow.hide()
})

//chat events
ipc.on('hide_chat', _ => {
    console.log('hide the window')
    chatwindow.hide()
})


//contacts events
ipc.on('hide_contacts', _ => {
    console.log('hide the window')
    contactswindow.hide()
})
