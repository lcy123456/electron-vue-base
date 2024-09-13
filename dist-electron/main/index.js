var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_electron = require("electron");
var import_windowManage = require("./windowManage");
var import_trayManage = require("./trayManage");
var import_ipcHandlerManage = require("./ipcHandlerManage");
var import_appManage = require("./appManage");
var import_menuManage = __toESM(require("./menuManage"));
var import_utils = require("../utils");
const init = () => {
  (0, import_windowManage.createMainWindow)();
  (0, import_windowManage.createNotificationWindow)();
  (0, import_windowManage.createMediaPreviewWindow)();
  (0, import_menuManage.default)();
  (0, import_trayManage.createTray)();
};
(0, import_appManage.setAppGlobalData)();
(0, import_ipcHandlerManage.setIpcMainListener)();
(0, import_appManage.setSingleInstance)();
(0, import_appManage.setAppListener)(init);
import_electron.app.whenReady().then(() => {
  import_utils.isLinux ? setTimeout(init, 300) : init();
  import_electron.globalShortcut.register("Alt+CommandOrControl+I", () => {
    console.log("Alt+CommandOrControl+I");
    (0, import_windowManage.openMainTools)();
  });
  import_electron.globalShortcut.register("Alt+CommandOrControl+J", () => {
    console.log("Alt+CommandOrControl+J");
    (0, import_windowManage.openNotificationTools)();
  });
  import_electron.globalShortcut.register("Alt+CommandOrControl+K", () => {
    console.log("Alt+CommandOrControl+k");
    (0, import_windowManage.openMediaPreviewDevTools)();
  });
});

//# sourceMappingURL=index.js.map