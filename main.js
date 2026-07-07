const { app, BrowserWindow, session } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, 'Icono nutri.ico'),
    title: 'Nutri',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      // Habilita la File System Access API (showSaveFilePicker, showOpenFilePicker)
      enableBlinkFeatures: 'FileSystemAccessAPI',
    },
  });

  // Permite que la app acceda a ficheros locales (necesario para File System Access API)
  session.defaultSession.setPermissionRequestHandler((_webContents, permission, callback) => {
    const allowed = ['fileSystem', 'media', 'clipboard-sanitized-write'];
    callback(allowed.includes(permission));
  });

  win.loadFile('index.html');

  // Elimina el menú nativo para una experiencia más limpia
  win.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  app.quit();
});
