const electron = require('electron')

module.exports = function vitelContactsWindow(path, url, BrowserWindow, mainwindow_x, mainwindow_y) {

    contactswindow = new BrowserWindow({
        height: 200,
        width: 400,        
        autoHideMenuBar: true, 
        show: true,       
        x:  mainwindow_x - 800,
        y: mainwindow_y - 700,
        icon: path.join('src', 'images', 'chat_icon.png'),
        closable: false,
        minimizable: false,
        maximizable: false,
        resizable: false,
        title: "Contacts/Team"
    })
    contactswindow.on('closed', _ => {
        console.log('dialerwindow closed')
        dialerwindow = null; //make sure its garbage collected
    })
    contactswindow.loadURL(url.format({
        protocol: 'file',
        slashes: true,
        pathname: require('path').join(__dirname, '/../pages', 'contacts.html')
    }))

    return contactswindow;
}