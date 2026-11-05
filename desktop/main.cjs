const { app, BrowserWindow, shell } = require('electron');
const path = require('path');
const http = require('http');
const net = require('net');
const { fork } = require('child_process');

const isDev = !app.isPackaged;
let mainWindow = null;
let serverProcess = null;

// Find an available local port
function getAvailablePort() {
  return new Promise((resolve, reject) => {
    const s = net.createServer();
    s.unref();
    s.on('error', reject);
    s.listen(0, 'localhost', () => {
      const { port } = s.address();
      s.close(() => resolve(port));
    });
  });
}

// Poll local HTTP server until it responds
function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      const req = http.get(url, (res) => {
        res.resume(); // Discard data
        resolve();
      });

      req.on('error', () => {
        if (Date.now() - start > timeoutMs) {
          reject(new Error(`Timed out waiting for server at ${url}`));
        } else {
          setTimeout(check, 150);
        }
      });
    };
    check();
  });
}

async function startStandaloneServer(port) {
  const appPath = app.getAppPath();
  const baseDir = appPath.includes('app.asar')
    ? appPath.replace('app.asar', 'app.asar.unpacked')
    : appPath;

  const serverScript = path.join(baseDir, '.next', 'standalone', 'server.js');

  console.log(`[Electron] Starting Next.js standalone server from: ${serverScript}`);

  serverProcess = fork(serverScript, [], {
    env: {
      ...process.env,
      PORT: String(port),
      // Must be 'localhost' (not '127.0.0.1'): Next.js proxies middleware
      // rewrites (next-intl) to http://localhost:<port>, which on macOS
      // resolves to ::1 first. Binding to 127.0.0.1 only causes ECONNRESET
      // and a 500 "Internal Server Error" on every localized page.
      HOSTNAME: 'localhost',
      NODE_ENV: 'production',
      ELECTRON_RUN_AS_NODE: '1',
    },
    execPath: process.execPath,
    stdio: 'ignore',
  });

  serverProcess.on('error', (err) => {
    console.error('[Electron] Server process error:', err);
  });

  serverProcess.on('exit', (code, signal) => {
    console.log(`[Electron] Server process exited with code ${code}, signal ${signal}`);
  });

  await waitForServer(`http://localhost:${port}`);
  console.log(`[Electron] Standalone server is ready on port ${port}`);
}

// Supported UI locales (must match src/i18n/config)
const SUPPORTED_LOCALES = ['en', 'es', 'fr', 'it', 'pt-PT'];

// Pick the UI locale from the OS language, falling back to English
function getStartLocale() {
  const sys = (app.getLocale() || 'en').toLowerCase();
  if (sys.startsWith('pt')) return 'pt-PT';
  const base = sys.split('-')[0];
  return SUPPORTED_LOCALES.includes(base) ? base : 'en';
}

// The desktop app has no landing page: it opens straight into the tools workspace
function getToolsUrl(baseUrl, locale) {
  return `${baseUrl}/${locale || getStartLocale()}/tools`;
}

// Matches the marketing landing page: "/" or "/<locale>" (with optional trailing slash)
const LANDING_PATH_RE = new RegExp(`^/(?:(${SUPPORTED_LOCALES.join('|')})/?)?$`);

function getLandingLocale(url, baseUrl) {
  if (!url.startsWith(baseUrl)) return null;
  const { pathname } = new URL(url);
  const match = pathname.match(LANDING_PATH_RE);
  if (!match) return null;
  return match[1] || getStartLocale();
}

async function createWindow(targetUrl) {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 850,
    minWidth: 900,
    minHeight: 600,
    title: 'Refinedocs',
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
      devTools: isDev,
    },
  });

  // Open external links in default OS browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http:') || url.startsWith('https:')) {
      if (!url.startsWith(targetUrl)) {
        shell.openExternal(url);
        return { action: 'deny' };
      }
    }
    return { action: 'allow' };
  });

  // Redirect any navigation to the landing page (logo click, "Home" links,
  // client-side router pushes) back to the tools workspace.
  const redirectLanding = (event, url) => {
    const locale = getLandingLocale(url, targetUrl);
    if (locale) {
      if (event && typeof event.preventDefault === 'function') event.preventDefault();
      mainWindow.loadURL(getToolsUrl(targetUrl, locale));
    }
  };
  mainWindow.webContents.on('will-navigate', redirectLanding);
  mainWindow.webContents.on('did-navigate-in-page', (_event, url) => redirectLanding(null, url));

  await mainWindow.loadURL(getToolsUrl(targetUrl));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function stopServer() {
  if (serverProcess) {
    try {
      serverProcess.kill();
    } catch (e) {
      // Ignore
    }
    serverProcess = null;
  }
}

app.whenReady().then(async () => {
  let targetUrl;

  if (isDev) {
    targetUrl = process.env.ELECTRON_START_URL || 'http://localhost:3000';
  } else {
    try {
      const port = await getAvailablePort();
      await startStandaloneServer(port);
      targetUrl = `http://localhost:${port}`;
    } catch (err) {
      console.error('[Electron] Failed to start standalone server:', err);
      app.quit();
      return;
    }
  }

  await createWindow(targetUrl);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow(targetUrl);
    }
  });
});

app.on('before-quit', stopServer);

app.on('window-all-closed', () => {
  stopServer();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
