const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");

function createWindow() {
  // Create the browser window.
  var win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, `../dist/assets/app-icons/logo.png`),
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `../dist/index.html`),
      protocol: "file:",
      slashes: true,
    })
  );
  win.on("closed", () => {
    win = null;
  });
  win.maximize();
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
