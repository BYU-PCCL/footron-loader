const { app } = require("electron");
const { env } = process;

let win;

async function createWindow() {
  const { app, BrowserWindow } = require("electron");
  const path = require("path");
  win = new BrowserWindow({
    frame: false,
    show: false,
    width: 2162,
    height: 1216,
    backgroundColor: "black",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.once('ready-to-show', () => {
    win.show()
  })
  win.setAlwaysOnTop(true, "floating");

  await win.loadFile("index.html");
}

app.whenReady().then(async () => {
    await createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
