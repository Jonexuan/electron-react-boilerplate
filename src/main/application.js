
const { ipcMain } = require("electron")
const jsonfile = require("jsonfile")
const { getPath  } = require("./utils")
const ipcListener = require("./ipcListener")
const Views = require("./views")
const View = require("./view")
const Windows = require("./windows")


class Application {
    config = {}
    configPath = ""
    constructor(){
        this.windows = new Windows(this)
        this.configPath = getPath("./config/config.json")
        this.config = jsonfile.readFileSync(this.configPath)
        if (process.NODE_ENV == "development"){
            this.config.debug = true
        }
    }

    init(){
        console.log(this.config)
        ipcListener(this)
        this.windows.init()
        this.mainWindow = this.windows.windows.get("main")
        this.loginWindow = this.windows.windows.get("login")
        this.views = new Views(this)
        this.loginWindow.show()
        this.createView({id: "apps", url: "apps.html", name: "我的应用"})
        this.setCurrentView("apps")
    }
    createView({id, url, name}){
        let view = this.views.getView(id)
        if (!view){
            view  = new View({url, name})
            this.views.addView(id, view)
        }
        return view
    }
    sendToMainWebContents(channel, payload){
        const webContents = this.mainWindow.webContents

        webContents.send(channel, payload)
    }
    sendViewsStateToWebContents(){
        const views = this._getViewsState()
        this.sendToMainWebContents("TAB_VIEW_SYNC", {views})
    }
    setCurrentView(id){
        this.views.setFocus(id)
        this.sendViewsStateToWebContents()
    }
    _getViewsState(){
        const views = []
        const id = this.views.selectedId
        this.views.views.forEach((v, k) => {
            views.push({
                id: k,
                url: v.getUrl(),
                webContentId: v.getId(),
                name: v.name,
                actived: id === k
            })
        })
        return views
    }
}

module.exports = Application 
