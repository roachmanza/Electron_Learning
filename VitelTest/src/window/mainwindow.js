const electron = require('electron')

module.exports = function vitelApplicationWindow(path,url,BrowserWindow,mainwindow_x,mainwindow_y) {

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
        })
        let mainwindowurl = url.format({
            protocol: 'file',
            slashes: true,
            pathname: require('path').join(__dirname, '/../pages', 'main.html')
        })
        mainWindow.loadURL(mainwindowurl)

        return mainWindow;
}