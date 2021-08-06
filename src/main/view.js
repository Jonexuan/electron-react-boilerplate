import {app, ipcMain, BrowserView} from "electron"
import { parse } from "url"
import { getUrl } from "./utils"

export default class View {
    browserView = null
    homeUrl = ""
    favicon = ""
    incognito = false
    errorURL = ""
    hasError = false
    bounds = []
    lastHistoryId = ""
    type = ""
    constructor({url, name, incognito}){
        this.browserView = new BrowserView({
            webPreferences: {
                preload: `${app.getAppPath()}/build/view-preload.bundle.js`,
                nodeIntegration: false,
                contextIsolation: true,
                sandbox: true,
                enableRemoteModule: false,
                partition: incognito? "view_incognito" : "persist:view",
                plugins: true,
                nativeWindowOpen: true,
                webSecurity: true,
                javascript: true,
                worldSafeExecuteJavaScript: false
            }
        })
        if (url.indexOf("://")){
            this.type = 2
        } else if (url == "app.html"){
            this.type = 0
        } else {
            this.type = 1
        }
        this.homeUrl = getUrl(url)
        console.log(this.homeUrl)
        this.incognito = incognito
        this.name = name
        this.webContents = this.browserView.webContents
        this.browserView.webContents.loadURL(this.homeUrl)
        this.browserView.setAutoResize({
            width: true,
            height: true,
            horizontal: false,
            vertical: false
        })
    }
    getWebContents(){
        return this.browserView.webContents
    }
    getUrl(){
        return this.webContents.getURL()
    }
    getTitle(){
        return this.webContents.getTitle()
    }
    getId(){
        return this.webContents.id
    }
    getHostname(){
        return parse(this.url).hostname
    }

    updateNavigationState(){}
    updateCredentials(){}
    updateURL(){}
    updateData(){}
    send(channel, ...args){
        this.webContents.send(channel, ...args)
    }
    emitEvent(event, ...args){
    }
    destory(){}
}