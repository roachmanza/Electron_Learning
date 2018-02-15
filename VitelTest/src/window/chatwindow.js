const electron = require('electron')

module.exports = function vitelChatWindow(path, url, BrowserWindow, mainwindow_x, mainwindow_y) {

    chatwindow = new BrowserWindow({
        height: 300,
        width: 400,
        autoHideMenuBar: true,
        show: true,
        x: mainwindow_x - 800,
        y: mainwindow_y - 500,
        icon: path.join('src', 'images', 'chat_icon.png'),
        closable: false,
        minimizable: false,
        maximizable: false,
        resizable: false,
        title: "Live vitel chat"
    })
    chatwindow.on('closed', _ => {
        console.log('dialerwindow closed')
        dialerwindow = null; //make sure its garbage collected
    })
    chatwindow.loadURL(url.format({
        protocol: 'file',
        slashes: true,
        pathname: require('path').join(__dirname, '/../pages', 'chat.html')
    }))

    return chatwindow;
}