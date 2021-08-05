import { app } from "electron"
import Application from "./application"

const application = new Application()


app.on("ready", () => {
    application.init()
})


