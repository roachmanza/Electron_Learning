const electron = require('electron')

module.exports = function vitelDialerWindow(path, url, BrowserWindow, mainwindow_x, mainwindow_y) {

    dialerwindow = new BrowserWindow({
        height: 200,
        width: 400,
        autoHideMenuBar: true,
        show: true,
        x: mainwindow_x - 400,
        y: mainwindow_y - 400,
        icon: path.join('src', 'images', 'dialer_icon.png'),
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
        pathname: require('path').join(__dirname, '/../pages', 'dialer.html')
    }))

    return dialerwindow;
}