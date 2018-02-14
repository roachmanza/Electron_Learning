
module.exports = function vitelContextMenu(loginwindow, dialerwindow, mainWindow, app, appName) {

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
    return ctxtemplate;


}