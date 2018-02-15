const electron = require('electron')

module.exports = function vitelLoginWindow(path, url, BrowserWindow, mainwindow_x, mainwindow_y) {

    loginwindow = new BrowserWindow({
        height: 200,width: 400,        
        autoHideMenuBar: true, 
        show: true,       
        x:  mainwindow_x - 400,
        y: mainwindow_y - 700,
        icon: path.join('src', 'images', 'login_icon.png'),
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
        pathname: require('path').join(__dirname, '/../pages', 'login.html')
    }))

    return loginwindow;
}