var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  blinkWindow: () => blinkWindow,
  closeWindow: () => closeWindow,
  createMainWindow: () => createMainWindow,
  createMediaPreviewWindow: () => createMediaPreviewWindow,
  createNotificationWindow: () => createNotificationWindow,
  handleWindowPort: () => handleWindowPort,
  hideWindow: () => hideWindow,
  isExistMainWindow: () => isExistMainWindow,
  mediaPreviewHide: () => mediaPreviewHide,
  mediaPreviewSetSize: () => mediaPreviewSetSize,
  mediaPreviewShow: () => mediaPreviewShow,
  minimize: () => minimize,
  notificationHeight: () => notificationHeight,
  notificationHide: () => notificationHide,
  notificationShow: () => notificationShow,
  openMainTools: () => openMainTools,
  openMediaPreviewDevTools: () => openMediaPreviewDevTools,
  openNotificationTools: () => openNotificationTools,
  resetPosition: () => resetPosition,
  setBadgeCount: () => setBadgeCount,
  showSelectDialog: () => showSelectDialog,
  showWindow: () => showWindow,
  toggleHide: () => toggleHide,
  toggleMinimize: () => toggleMinimize,
  updateMaximize: () => updateMaximize
});
module.exports = __toCommonJS(stdin_exports);
var import_node_path = require("node:path");
var import_electron = require("electron");
var import_utils = require("../utils");
var import_trayManage = require("./trayManage");
var import_storeManage = require("./storeManage");
var import_appManage = require("./appManage");
var import_trayManage2 = require("./trayManage");
var import_autoUpdater = require("../utils/autoUpdater");
const url = process.env.VITE_DEV_SERVER_URL;
let mainWindow = null;
let mainBadge;
let notificationWindow = null;
let mediaPreviewWindow = null;
let mainWindow2 = null;
const store = (0, import_storeManage.getStore)();
function createMainWindow() {
  import_electron.app.commandLine.appendSwitch("ignore-certificate-errors");
  mainWindow = new import_electron.BrowserWindow({
    title: "ET2",
    icon: import_utils.isMac ? (0, import_node_path.join)(global.pathConfig.publicPath, "/icons/ico.png") : (0, import_node_path.join)(global.pathConfig.publicPath, "/icons/logo.png"),
    // frame: false,
    minWidth: 990,
    minHeight: 700,
    width: 990,
    height: 700,
    webPreferences: {
      preload: global.pathConfig.preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: false,
      webSecurity: false
    }
  });
  if (url) {
    setTimeout(openMainTools, 2e3);
    mainWindow.loadURL(url);
  } else {
    (0, import_autoUpdater.handleUpdate)(mainWindow);
    mainWindow.loadFile(global.pathConfig.indexHtml);
  }
  mainWindow.on("close", (e) => {
    if ((0, import_appManage.getIsForceQuit)() || !mainWindow.isVisible() || store.get("closeAction") === "quit") {
      mainWindow = null;
      notificationWindow == null ? void 0 : notificationWindow.close();
      mediaPreviewWindow == null ? void 0 : mediaPreviewWindow.close();
      (0, import_trayManage.destroyTray)();
    } else {
      e.preventDefault();
      if (import_utils.isMac && mainWindow.isFullScreen()) {
        mainWindow.setFullScreen(false);
      }
      mainWindow == null ? void 0 : mainWindow.hide();
    }
  });
  mainWebContents(mainWindow.webContents);
  if (import_utils.isWin) {
    mainBadge = new import_utils.Badge(mainWindow, {
      font: "10px arial",
      color: "#f23c34"
    });
  }
  global.mainWindow = mainWindow;
  let timer1 = null;
  let timer2 = null;
  function getLiij(str) {
    return new Promise((res, rej) => {
      try {
        mainWindow2.webContents.executeJavaScript(str).then((result) => {
          res(result);
        });
      } catch (err) {
        res("");
      }
    });
  }
  async function getChildWindowContent() {
    if (mainWindow2) {
      let gunqiuData = "";
      let jinriData = "";
      try {
        gunqiuData = await getLiij(
          `document.querySelector('.LiveMarket')?.getElementsByClassName('MarketT')[1]?.innerHTML`
        );
      } catch (err) {
        console.log(111, err);
      }
      try {
        jinriData = await getLiij(
          `document.querySelector('.NonLiveMarket')?.getElementsByClassName('MarketT')[1]?.innerHTML`
        );
      } catch (err) {
        console.log(2222, err);
      }
      mainWindow.webContents.send("liji", {
        gunqiuData,
        jinriData
      });
    }
  }
  import_electron.ipcMain.handle("liji-open", (event, arg) => {
    console.log("arg--arg", arg);
    mainWindow2 && mainWindow2.close();
    mainWindow2 = new import_electron.BrowserWindow({
      height: 563,
      useContentSize: true,
      width: 1e3,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false
      }
    });
    mainWindow2.loadURL(`${arg}/en/euro/football`);
    mainWindow2.on("close", () => {
      console.log("\u5173\u95ED");
      mainWindow2 = null;
    });
    mainWindow2.hide();
  });
  import_electron.ipcMain.handle("liji-start", () => {
    console.log("liji", "\u4E3B\u8FDB\u7A0B\u54CD\u5E94");
    clearInterval(timer1);
    clearInterval(timer2);
    timer1 = setInterval(() => {
      getChildWindowContent();
    }, 1e3);
    timer2 = setInterval(() => {
      try {
        mainWindow2.webContents.executeJavaScript(`$('.RefreshBtn').click()`);
        mainWindow.webContents.send("liji-error", 1);
      } catch (err) {
        console.log(333, err);
        mainWindow.webContents.send("liji-error");
      }
    }, 1e3);
  });
  import_electron.ipcMain.handle("liji-close", () => {
    console.log("liji-close", "\u4E3B\u8FDB\u7A0B\u54CD\u5E94");
    clearInterval(timer1);
    clearInterval(timer2);
    mainWindow2 && mainWindow2.close();
  });
  return mainWindow;
}
const isExistMainWindow = () => !!mainWindow && !(mainWindow == null ? void 0 : mainWindow.isDestroyed());
const closeWindow = () => {
  if (!mainWindow)
    return;
  mainWindow.close();
};
const showSelectDialog = async (options) => {
  if (!mainWindow)
    throw new Error("main window is undefined");
  return await import_electron.dialog.showOpenDialog(mainWindow, options);
};
const minimize = () => {
  if (!mainWindow)
    return;
  mainWindow.minimize();
};
const updateMaximize = () => {
  if (!mainWindow)
    return;
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
};
const toggleHide = () => {
  if (!mainWindow)
    return;
  mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
};
const toggleMinimize = () => {
  if (!mainWindow)
    return;
  if (mainWindow.isMinimized()) {
    if (!mainWindow.isVisible()) {
      mainWindow.show();
    }
    mainWindow.restore();
    mainWindow.focus();
  } else {
    mainWindow.minimize();
  }
};
const showWindow = () => {
  if (!mainWindow)
    return;
  if (mainWindow.isMinimized()) {
    mainWindow.restore();
  }
  mainWindow.show();
};
const hideWindow = () => {
  if (!mainWindow)
    return;
  mainWindow.hide();
};
const setBadgeCount = (count) => {
  if (import_utils.isWin) {
    mainBadge.update(Number(count));
    return;
  }
  (0, import_trayManage2.traySetTitle)(count ? Number(count) > 99 ? "99+" : count + "" : "");
  import_electron.app.setBadgeCount(Number(count));
};
const blinkWindow = (val) => {
  if (!mainWindow)
    return;
  mainWindow.flashFrame(val);
};
const openMainTools = () => {
  if (!mainWindow)
    return;
  mainWindow.webContents.openDevTools({
    mode: "detach"
  });
};
const mainWebContents = (webContents) => {
  webContents.on("did-fail-load", (_, errorCode) => {
    switch (errorCode) {
      case -6:
        url ? mainWindow.loadURL(url) : mainWindow.loadFile(global.pathConfig.indexHtml);
        break;
    }
  });
};
function createNotificationWindow() {
  notificationWindow = new import_electron.BrowserWindow({
    width: 320,
    height: 90,
    frame: false,
    skipTaskbar: true,
    show: false,
    transparent: true,
    roundedCorners: false,
    webPreferences: {
      preload: global.pathConfig.preload
    }
  });
  notificationWindow.loadFile(global.pathConfig.notificationHtml);
  notificationWindow.setAlwaysOnTop(true, "status");
  resetPosition();
  notificationWindow.on("close", (e) => {
    notificationWindow = null;
  });
}
const openNotificationTools = () => {
  if (!notificationWindow)
    return;
  notificationWindow.webContents.openDevTools({
    mode: "detach"
  });
};
const notificationShow = () => {
  notificationWindow.showInactive();
};
const notificationHide = () => {
  notificationWindow.hide();
};
const notificationHeight = (height) => {
  notificationWindow.setSize(320, height);
  resetPosition();
};
const resetPosition = () => {
  const mainScreen = import_electron.screen.getPrimaryDisplay();
  const { width, height } = mainScreen.workAreaSize;
  const notificationWindowBounds = notificationWindow.getBounds();
  const x = width - notificationWindowBounds.width - 10;
  const y = height - notificationWindowBounds.height - 10;
  notificationWindow.setPosition(x, y);
};
function createMediaPreviewWindow() {
  mediaPreviewWindow = new import_electron.BrowserWindow({
    frame: false,
    skipTaskbar: true,
    show: false,
    // titleBarStyle: "hiddenInset",
    transparent: true,
    webPreferences: {
      preload: global.pathConfig.mediaPreviewPreload
    }
  });
  if (url) {
    mediaPreviewWindow.loadURL(url);
  } else {
    mediaPreviewWindow.loadFile(global.pathConfig.indexHtml);
  }
  mediaPreviewSetSize();
  mediaPreviewWindow.on("close", (e) => {
    mediaPreviewWindow = null;
  });
}
const mediaPreviewSetSize = () => {
  const mainScreen = import_electron.screen.getPrimaryDisplay();
  const { width, height } = mainScreen.workAreaSize;
  mediaPreviewWindow.setSize(width, height);
  mediaPreviewWindow.setPosition(0, 0);
};
const mediaPreviewShow = () => {
  mediaPreviewWindow.show();
};
const mediaPreviewHide = () => {
  mediaPreviewWindow.hide();
  mainWindow.focus();
};
const openMediaPreviewDevTools = () => {
  if (!mediaPreviewWindow)
    return;
  mediaPreviewWindow.webContents.openDevTools({
    mode: "detach"
  });
};
const handleWindowPort = () => {
  if (!mainWindow || !notificationWindow || !mediaPreviewWindow)
    return;
  const { port1, port2 } = new import_electron.MessageChannelMain();
  mainWindow.webContents.postMessage("notificationPort", null, [port1]);
  notificationWindow.webContents.postMessage("notificationPort", null, [port2]);
  const { port1: port3, port2: port4 } = new import_electron.MessageChannelMain();
  mainWindow.webContents.postMessage("mediaPreviewPort", null, [port3]);
  mediaPreviewWindow.webContents.postMessage("mediaPreviewPort", null, [port4]);
};

//# sourceMappingURL=windowManage.js.map