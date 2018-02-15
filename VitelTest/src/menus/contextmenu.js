
module.exports = function vitelContextMenu(contactswindow, chatwindow, loginwindow, dialerwindow, mainWindow, app, appName) {

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
            label: 'Chat',
            click: _ => {
                chatwindow.isVisible() ? chatwindow.hide() : chatwindow.show()
            }
        },
        {
            label: 'Contacts',
            click: _ => {
                contactswindow.isVisible() ? contactswindow.hide() : contactswindow.show()
            }
        },
        {
            type: 'separator'
        },
        {
            label: 'Show all windows',
            click: _ => {
                mainWindow.isVisible() ? mainWindow.show() : mainWindow.show()
                dialerwindow.isVisible() ? mainWindow.show() : dialerwindow.show()
                loginwindow.isVisible() ? mainWindow.show() : loginwindow.show()
                chatwindow.isVisible() ? chatwindow.show() : chatwindow.show()
                contactswindow.isVisible() ? contactswindow.show() : contactswindow.show()
            }
        },
        {
            type: 'separator'
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
                chatwindow.setClosable(true)
                contactswindow.setClosable(true)
                app.quit()
            },
        }
    ]
    return ctxtemplate;


}