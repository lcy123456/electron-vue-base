var import_electron = require("electron");
const getPlatform = () => {
  if (process.platform === "darwin") {
    return 4;
  }
  if (process.platform === "win32") {
    return 3;
  }
  return 7;
};
const subscribe = (channel, callback) => {
  import_electron.ipcRenderer.on(channel, callback);
};
const subscribeOnce = (channel, callback) => {
  import_electron.ipcRenderer.once(channel, callback);
};
const unsubscribe = (channel, callback) => {
  import_electron.ipcRenderer.removeListener(channel, callback);
};
const unsubscribeAll = (channel) => {
  import_electron.ipcRenderer.removeAllListeners(channel);
};
const ipcInvoke = (channel, ...arg) => {
  return import_electron.ipcRenderer.invoke(channel, ...arg);
};
const openExternal = (src) => {
  import_electron.shell.openExternal(src);
};
import_electron.ipcRenderer.on("notificationPort", async (event) => {
  window.postMessage("notificationPort", "*", event.ports);
});
import_electron.ipcRenderer.on("mediaPreviewPort", async (event) => {
  window.postMessage("mediaPreviewPort", "*", event.ports);
});
const Api = {
  getVersion: () => process.version,
  getPlatform,
  subscribe,
  subscribeOnce,
  unsubscribe,
  unsubscribeAll,
  ipcInvoke,
  openExternal
};
window.console.log("1111---222");
import_electron.contextBridge.exposeInMainWorld("electronAPI", Api);

//# sourceMappingURL=index.js.map