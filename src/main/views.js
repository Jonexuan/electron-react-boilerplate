const { EventEmitter } = require("events")

class Views extends EventEmitter {
    views = new Map()
    selectedId = 0
    application = null
    _fullscreen = false
    
    constructor(application){
        super()
        this.application = application
        this.appWindow = this.application.mainWindow
    }
    getFullscreen(){
        return this._fullscreen
    }
    setFullscreen(val){
        this._fullscreen = !!val
        this.fixBounds()
    }
    getView(id){
        return this.views.get(id)
    }
    setFocus(id){
        const oldView = this.getView(this.selectedId)
        const newView = this.getView(id)
        if (oldView){
            this.appWindow.removeBrowserView(oldView.browserView)
        }
        if (newView){

            this.appWindow.addBrowserView(newView.browserView)
            this.selectedId = id
        }
        this.fixBounds()
    }
    fixBounds(){
        const {width, height} = this.appWindow.getContentBounds()
        const toolbarContentHeight = 46
        const newBounds = {
            x:0,
            y: toolbarContentHeight,
            width,
            height: height - toolbarContentHeight
        }
        const view = this.getView(this.selectedId)
        console.log(newBounds)
        if (view){
            view.browserView.setBounds(newBounds)
        }
        
    }
    addView(id, view){
        this.views.set(id, view)
    }
    removeView(){}
    destoryView(){}
}

module.exports = Views