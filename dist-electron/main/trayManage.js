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
  createTray: () => createTray,
  destroyTray: () => destroyTray,
  traySetImage: () => traySetImage,
  traySetTitle: () => traySetTitle
});
module.exports = __toCommonJS(stdin_exports);
var import_electron = require("electron");
var import_windowManage = require("./windowManage");
var import_node_path = require("node:path");
var import_utils = require("../utils");
let appTray;
let timer = null;
const createTray = () => {
  const trayMenu = import_electron.Menu.buildFromTemplate([
    {
      label: "\u663E\u793A\u4E3B\u754C\u9762",
      click: import_windowManage.showWindow
    },
    {
      label: "\u9690\u85CF\u4E3B\u754C\u9762",
      click: import_windowManage.hideWindow
    },
    {
      label: "\u9000\u51FA",
      click: () => {
        global.forceQuit = true;
        import_electron.app.quit();
      }
    }
  ]);
  appTray = new import_electron.Tray(global.pathConfig.trayIcon);
  appTray.setToolTip(import_electron.app.getName());
  appTray.setIgnoreDoubleClickEvents(true);
  appTray.on("right-click", () => {
    appTray.popUpContextMenu(trayMenu);
  });
  appTray.on("click", import_windowManage.showWindow);
};
const traySetTitle = (str) => {
  appTray.setTitle(str);
};
const destroyTray = () => {
  if (!appTray || appTray.isDestroyed())
    return;
  clearTimeout(timer);
  appTray.destroy();
  appTray = null;
};
const blinkTime = 1e3;
const traySetImage = (isBlink) => {
  if (import_utils.isMac || !appTray)
    return;
  clearTimeout(timer);
  if (isBlink) {
    appTray.setImage((0, import_node_path.join)(global.pathConfig.publicPath, "/icons/tray_clear.png"));
    timer = setTimeout(() => {
      appTray.setImage(global.pathConfig.trayIconTip);
      timer = setTimeout(() => {
        traySetImage(true);
      }, blinkTime);
    }, blinkTime);
    return;
  }
  appTray.setImage(global.pathConfig.trayIcon);
};

//# sourceMappingURL=trayManage.js.map