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
  getIsForceQuit: () => getIsForceQuit,
  setAppGlobalData: () => setAppGlobalData,
  setAppListener: () => setAppListener,
  setSingleInstance: () => setSingleInstance
});
module.exports = __toCommonJS(stdin_exports);
var import_electron = require("electron");
var import_windowManage = require("./windowManage");
var import_node_path = require("node:path");
var import_utils = require("../utils");
var import_storeManage = require("./storeManage");
const store = (0, import_storeManage.getStore)();
import_electron.app.commandLine.appendSwitch("wm-window-animations-disabled");
const setSingleInstance = () => {
  if (!import_electron.app.requestSingleInstanceLock()) {
    import_electron.app.quit();
    process.exit(0);
  }
  import_electron.app.on("second-instance", () => {
    (0, import_windowManage.showWindow)();
  });
};
const setAppListener = (startApp) => {
  import_electron.app.on("ready", () => {
    import_utils.isWin && import_electron.app.setAppUserModelId("ET2");
  });
  import_electron.app.on("activate", () => {
    if ((0, import_windowManage.isExistMainWindow)()) {
      (0, import_windowManage.showWindow)();
    } else {
      startApp();
    }
  });
  import_electron.app.on("window-all-closed", () => {
    if (import_utils.isMac && !getIsForceQuit())
      return;
    import_electron.app.quit();
  });
};
const setAppGlobalData = () => {
  const electronDistPath = (0, import_node_path.join)(__dirname, "../");
  const distPath = (0, import_node_path.join)(electronDistPath, "../dist");
  const publicPath = import_utils.isProd ? distPath : (0, import_node_path.join)(electronDistPath, "../public");
  global.pathConfig = {
    electronDistPath,
    distPath,
    publicPath,
    trayIcon: (0, import_node_path.join)(
      publicPath,
      `/icons/${import_utils.isWin ? "tray@2x.png" : "icon_16x16Template@2x.png"}`
    ),
    trayIconTip: (0, import_node_path.join)(
      publicPath,
      `/icons/${import_utils.isWin ? "tray@2x_tip.png" : "icon_16x16Template@2x.png"}`
    ),
    indexHtml: (0, import_node_path.join)(distPath, "index.html"),
    notificationHtml: (0, import_node_path.join)(publicPath, "notificationPage/index.html"),
    preload: (0, import_node_path.join)(__dirname, "../preload/index.js"),
    mediaPreviewPreload: (0, import_node_path.join)(__dirname, "../preload/mediaPreviewPreload.js")
  };
};
const getIsForceQuit = () => store.get("closeAction") === "quit" || global.forceQuit;

//# sourceMappingURL=appManage.js.map