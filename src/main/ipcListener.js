import {ipcMain} from "electron"

export default (application) => {
    ipcMain.on("GET_CONFIG", (e) => {
        e.returnValue = application.config
    })
    ipcMain.on("USER_LOGIN", (e, payload) => {
        //login process fn
        if (payload.name == "admin"){
            application.loginWindow.hide()
            application.mainWindow.show()
        }
    })
    ipcMain.on("TAB_VIEW_ADD", (e, payload) => {
        const {type, name, url, id} = payload
        if (type < 2) {
            //系统应用
            application.createView({id, name, url: `${id}.html`})
            application.setCurrentView(id)
        } else {
            application.createView({id, name, url})
            application.setCurrentView(id)
        }
    })
    ipcMain.on("TAB_VIEW_QUERY", (e) => {
        application.sendViewsStateToWebContents()
    })
}
