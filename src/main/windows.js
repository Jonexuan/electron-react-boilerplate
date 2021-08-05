import {app, BrowserWindow} from "electron"
import {EventEmitter} from "events"

export default class Windows extends EventEmitter {
    windows = new Map()
    application = null
    constructor(application){
        super()
        this.application = application
    }
    createLoginWindow(){
        const win = new BrowserWindow({
            width: 480,
            height: 360,
            show: false,
            webPreferences: {
                preload: `${app.getAppPath()}/build/view-preload.bundle.js`,
                contextIsolation: true
            }
        })
        win.loadURL("http://127.0.0.1:4444/login.html")
        this.windows.set("login", win)
        win.on("closed", () => {
            this.windows.delete("login")
        })
    }
    createMainWindow(){
        const win = new BrowserWindow({
            width: 800,
            height: 600,
            show: false,
            webPreferences: {
                preload: `${app.getAppPath()}/build/view-preload.bundle.js`,
                contextIsolation: true
            }
        })
        win.loadURL("http://127.0.0.1:4444/main.html")
        win.on("closed", () => {
            this.windows.delete("main")
            app.exit()
        })
        this.windows.set("main", win)
    }
    init(){
        this.createMainWindow()
        this.createLoginWindow()
    }
}
