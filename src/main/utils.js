import { app } from "electron"
import {resolve, join} from "path"

export const getPath = (str) => {
    if (process.env.NODE_ENV == "development"){
        return resolve(str)
    }
    return join(app.getAppPath("exe"), str)
}

export const getUrl = (str) => {
    if (str.startsWith("https://") || str.startsWith("http://")){
        return str
    }
    if (process.env.NODE_ENV == "development"){
        return "http://127.0.0.1:4444/" + str
    } else {
        return join("file://", app.getAppPath(), "build", str)
    }
}
