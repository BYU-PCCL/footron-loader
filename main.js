const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");

const { env } = process;

let win;

async function createWindow() {
  win = new BrowserWindow({
    frame: false,
    show: false,
    backgroundColor: "#fafafa",
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

app.whenReady().then(() => {
  setTimeout(async function () {
    await createWindow();
  }, 1000);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
