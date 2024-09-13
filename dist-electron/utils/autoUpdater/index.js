var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  checkForUpdates: () => checkForUpdates,
  default: () => stdin_default,
  handleUpdate: () => handleUpdate,
  quitAndInstall: () => quitAndInstall,
  setFeedURL: () => setFeedURL
});
module.exports = __toCommonJS(stdin_exports);
var import_electron_updater = require("electron-updater");
var import_log = __toESM(require("../log"));
const server = "https://doc.ET2.com";
const statusMap = {
  error: { status: -1, message: "\u66F4\u65B0\u51FA\u9519" },
  checking: { status: 0, message: "\u6B63\u5728\u68C0\u67E5\u66F4\u65B0..." },
  updateAvailable: { status: 1, message: "\u68C0\u6D4B\u5230\u65B0\u7248\u672C\uFF0C\u51C6\u5907\u5F00\u59CB\u4E0B\u8F7D..." },
  downloadProgress: { status: 2, message: "\u65B0\u7248\u672C\u6B63\u5728\u4E0B\u8F7D..." },
  updateDownloaded: { status: 3, message: "\u65B0\u7248\u672C\u5DF2\u4E0B\u8F7D\u6210\u529F\uFF0C\u786E\u5B9A\u540E\u5B89\u88C5\u6700\u65B0\u7248\u672C" },
  updateNotAvailable: { status: 4, message: "\u5DF2\u7ECF\u662F\u6700\u65B0\u7248\u672C" }
};
const handleUpdate = (mainWindow) => {
  import_electron_updater.autoUpdater.logger = import_log.default;
  import_electron_updater.autoUpdater.autoDownload = false;
  import_electron_updater.autoUpdater.on("checking-for-update", () => {
    console.log("Checking for update...");
    sendUpdateStatus(statusMap.checking);
  });
  import_electron_updater.autoUpdater.on("update-available", (info) => {
    console.log("Update available.", info);
    sendUpdateStatus(statusMap.updateAvailable);
    import_electron_updater.autoUpdater.downloadUpdate();
  });
  import_electron_updater.autoUpdater.on("update-not-available", (info) => {
    console.log("Update not available.", info);
    sendUpdateStatus(statusMap.updateNotAvailable);
  });
  import_electron_updater.autoUpdater.on("error", (err) => {
    console.log("Error in auto-updater. " + err);
    sendUpdateStatus({
      ...statusMap.error,
      message: "\u66F4\u65B0\u51FA\u9519\uFF1A" + err
    });
  });
  import_electron_updater.autoUpdater.on("download-progress", (progressInfo) => {
    let log_message = "Download speed: " + progressInfo.bytesPerSecond;
    log_message = log_message + " - Downloaded " + progressInfo.percent + "%";
    log_message = log_message + " (" + progressInfo.transferred + "/" + progressInfo.total + ")";
    console.log(log_message);
    sendUpdateStatus({ ...statusMap.downloadProgress, progressInfo });
  });
  import_electron_updater.autoUpdater.on("update-downloaded", (info) => {
    console.log("Update downloaded", info);
    sendUpdateStatus(statusMap.updateDownloaded);
  });
  function sendUpdateStatus(data) {
    mainWindow.webContents.send("updaterStatus", data);
  }
};
const setFeedURL = (version) => {
  const url = `${server}/${process.platform}/${version}`;
  import_electron_updater.autoUpdater.setFeedURL(url);
  checkForUpdates();
};
const checkForUpdates = () => {
  import_electron_updater.autoUpdater.checkForUpdates();
};
const quitAndInstall = () => {
  global.forceQuit = true;
  global.mainWindow.setClosable(true);
  import_electron_updater.autoUpdater.quitAndInstall();
};
var stdin_default = import_electron_updater.autoUpdater;

//# sourceMappingURL=index.js.map