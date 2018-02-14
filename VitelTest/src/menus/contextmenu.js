
module.exports = function vitelContextMenu(loginwindow, app, appName) {
    const template = [
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
            accelerator: 'Cmd+A'
        },
        {
            type: 'separator'
        },
        {
            label: 'Quit',
            click: _ => {
                app.quit()
            },
            accelerator: 'Cmd+Q'
        }
    ]
    return template;

}