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
  setIpcMainListener: () => setIpcMainListener
});
module.exports = __toCommonJS(stdin_exports);
var import_electron = require("electron");
var import_windowManage = require("./windowManage");
var import_constants = require("../constants");
var import_storeManage = require("./storeManage");
var import_autoUpdater = require("../utils/autoUpdater");
var import_utils = require("../utils");
var import_trayManage = require("./trayManage");
const store = (0, import_storeManage.getStore)();
const setIpcMainListener = () => {
  import_electron.ipcMain.handle(import_constants.IpcRenderToMain.showWindow, import_windowManage.showWindow);
  import_electron.ipcMain.handle(import_constants.IpcRenderToMain.minimizeWindow, import_windowManage.minimize);
  import_electron.ipcMain.handle(import_constants.IpcRenderToMain.maxmizeWindow, import_windowManage.updateMaximize);
  import_electron.ipcMain.handle(import_constants.IpcRenderToMain.closeWindow, import_windowManage.closeWindow);
  import_electron.ipcMain.handle(import_constants.IpcRenderToMain.updateBadge, (_, { count }) => {
    (0, import_windowManage.setBadgeCount)(count);
  });
  import_electron.ipcMain.handle(import_constants.IpcRenderToMain.blinkWindow, (_, val) => {
    (0, import_trayManage.traySetImage)(val);
    (0, import_windowManage.blinkWindow)(val);
  });
  import_electron.ipcMain.handle(import_constants.IpcRenderToMain.getWindowPort, import_windowManage.handleWindowPort);
  import_electron.ipcMain.handle(import_constants.IpcRenderToMain.autoUpdater, (_, version) => {
    (0, import_autoUpdater.setFeedURL)(version);
  });
  import_electron.ipcMain.handle(import_constants.IpcRenderToMain.quitAndInstall, import_autoUpdater.quitAndInstall);
  import_electron.ipcMain.handle(import_constants.IpcRenderToMain.showNotification, import_windowManage.notificationShow);
  import_electron.ipcMain.handle(import_constants.IpcRenderToMain.hideNotification, import_windowManage.notificationHide);
  import_electron.ipcMain.handle(import_constants.IpcRenderToMain.heightNotification, (_, height) => {
    (0, import_windowManage.notificationHeight)(height);
  });
  import_electron.ipcMain.handle(import_constants.IpcRenderToMain.showMediaPreview, import_windowManage.mediaPreviewShow);
  import_electron.ipcMain.handle(import_constants.IpcRenderToMain.hideMediaPreview, import_windowManage.mediaPreviewHide);
  import_electron.ipcMain.handle(import_constants.IpcRenderToMain.setKeyStore, (_, { key, data }) => {
    store.set(key, data);
  });
  import_electron.ipcMain.handle(import_constants.IpcRenderToMain.getKeyStore, (e, { key }) => {
    return store.get(key);
  });
  import_electron.ipcMain.handle(import_constants.IpcRenderToMain.deleteKeyStore, (e, { key }) => {
    return store.delete(key);
  });
  import_electron.ipcMain.handle(import_constants.IpcRenderToMain.getPackVersion, () => {
    return import_electron.app.getVersion();
  });
  import_electron.ipcMain.handle(import_constants.IpcRenderToMain.compareFiles, async (e, params) => {
    return await (0, import_utils.compareFiles)(params);
  });
  import_electron.ipcMain.handle(import_constants.IpcRenderToMain.previewFile, async (e, params) => {
    return await (0, import_utils.previewFile)(params);
  });
  import_electron.ipcMain.handle(import_constants.IpcRenderToMain.saveAsFile, async (e, params) => {
    try {
      return await (0, import_utils.saveAsFile)(params);
    } catch (err) {
      import_utils.log.error(err);
    }
  });
  import_electron.ipcMain.handle(import_constants.IpcRenderToMain.cacheFile, async (e, params) => {
    try {
      return await (0, import_utils.cacheFile)(params);
    } catch (err) {
      import_utils.log.error(err);
    }
  });
  import_electron.ipcMain.handle(import_constants.IpcRenderToMain.getFile, async (e, params) => {
    try {
      return await (0, import_utils.getFile)(params);
    } catch (err) {
      import_utils.log.error(err);
      throw new Error(err);
    }
  });
};

//# sourceMappingURL=ipcHandlerManage.js.map