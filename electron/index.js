const { app, BrowserWindow, Menu } = require('electron');
const isDevMode = require('electron-is-dev');
const { CapacitorSplashScreen, configCapacitor } = require('@capacitor/electron');

const path = require('path');

// Place holders for our windows so they don't get garbage collected.
let mainWindow = null;

// Placeholder for SplashScreen ref
let splashScreen = null;

//Change this if you do not wish to have a splash screen
let useSplashScreen = true;

// Create simple menu for easy devtools access, and for demo
const menuTemplateDev = [
  {
    label: 'Dev Options',
    submenu: [
      {
        label: 'Open Dev Tools',
        click() {
          mainWindow.openDevTools();
        },
      },
    ],
  },
];

async function createWindow () {
  // Define our main window size
  mainWindow = new BrowserWindow({
    height: 920,
    width: 1600,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'node_modules', '@capacitor', 'electron', 'dist', 'electron-bridge.js')
    }
  });

  configCapacitor(mainWindow);

  if (isDevMode) {
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplateDev));
  } else {
    Menu.setApplicationMenu(null)
  }

  if(useSplashScreen) {
    splashScreen = new CapacitorSplashScreen(mainWindow, {
      imageFileName: "logo.png",
      windowWidth: 600,
      windowHeight: 600,
      loadingText: "Launching StudyBoom Application",
      transparentWindow: true
    });
    splashScreen.init();
  } else {
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
    mainWindow.webContents.on('dom-ready', () => {
      mainWindow.show();
    });
  }

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some Electron APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// Define any IPC or other custom functionality below here
