var import_electron = require("electron");
const ipcInvoke = (channel, ...arg) => {
  return import_electron.ipcRenderer.invoke(channel, ...arg);
};
import_electron.ipcRenderer.on("mediaPreviewPort", async (event) => {
  window.postMessage("mediaPreviewPort", "*", event.ports);
});
const Api = {
  routePath: "/mediaPreview",
  ipcInvoke
};
import_electron.contextBridge.exposeInMainWorld("electronAPI", Api);

//# sourceMappingURL=mediaPreviewPreload.js.map