const electron = require('electron')
const path = require('path')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const countdown = require('./countdown.js')
const ipc = electron.ipcMain
let mainWindow //use a variable for the browserwindow to garbage collect etc

app.on('ready', _ => {
    console.log('ready for work')
    mainWindow = new BrowserWindow({
        height: 400,
        width: 400
    })

    // this was the example of the course , does not work
    // mainWindow.loadURL("file://${__dirname}/countdown.html")

    // Load the url of the page you want to display in the main window
    mainWindow.loadURL('file://' + path.join(__dirname, 'countdown.html'))

    //countdown()

    // current application code  - missing packages here
    // mainWindow.loadURL(url.format({ 
    //     pathname: path.join(__dirname, 'countdown.html'), 
    //     protocol: 'file:', 
    //     slashes: true }))

    mainWindow.on('closed', _ => {
        console.log('closed')
        mainWindow = null; //make sure its garbage collected

    })

})

ipc.on('countdown-start', _ => {
    console.log('caught it')
    countdown(count=>{
        mainWindow.webContents.send('countdown', count)
    })
})