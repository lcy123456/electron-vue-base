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
  IpcRenderToMain: () => IpcRenderToMain
});
module.exports = __toCommonJS(stdin_exports);
const IpcRenderToMain = {
  showWindow: "showWindow",
  minimizeWindow: "minimizeWindow",
  maxmizeWindow: "maxmizeWindow",
  closeWindow: "closeWindow",
  setKeyStore: "setKeyStore",
  getKeyStore: "getKeyStore",
  deleteKeyStore: "deleteKeyStore",
  updateBadge: "updateBadge",
  blinkWindow: "blinkWindow",
  getPackVersion: "getPackVersion",
  autoUpdater: "autoUpdater",
  quitAndInstall: "quitAndInstall",
  getWindowPort: "getWindowPort",
  // notification
  showNotification: "showNotification",
  hideNotification: "hideNotification",
  heightNotification: "heightNotification",
  // mediaPreview
  showMediaPreview: "showMediaPreview",
  hideMediaPreview: "hideMediaPreview",
  // fileHandle
  compareFiles: "compareFiles",
  previewFile: "previewFile",
  saveAsFile: "saveAsFile",
  cacheFile: "cacheFile",
  getFile: "getFile"
};

//# sourceMappingURL=index.js.map