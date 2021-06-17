const { app } = require("electron")
const Application = require("./application")

const application = new Application()


app.on("ready", () => {
    application.init()
})


