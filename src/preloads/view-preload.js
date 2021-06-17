const { ipcRenderer, contextBridge } = require("electron")

console.log("view preload init")

const config = ipcRenderer.sendSync("GET_CONFIG")
const styles = {}
contextBridge.exposeInMainWorld("APP", {
    send: (channel, ...args) => {
        console.log("preload send channel:", channel, ...args)
        ipcRenderer.send(channel, ...args)
    },
    receive: (channel, onReceived) => {
        const callback = (_, ...args) => onReceived(...args)
        ipcRenderer.on(channel, callback)
    },
    logger: ( namespace, options ) => {
        const send = ( level, message, meta ) => {
            ipcRenderer.send( 'log', level, namespace, options, message, meta );
        };

        return {
            error: ( message, meta ) => send( 'error', message, meta ),
            warn: ( message, meta ) => send( 'warn', message, meta ),
            info: ( message, meta ) => send( 'info', message, meta ),
            debug: ( message, meta ) => send( 'debug', message, meta ),
            silly: ( message, meta ) => send( 'silly', message, meta ),
        };
    },
    config,
    styles
})
