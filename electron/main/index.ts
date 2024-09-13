import { app, globalShortcut } from "electron";
import {
  createMainWindow,
  createNotificationWindow,
  createMediaPreviewWindow,
  openMainTools,
  openNotificationTools,
  openMediaPreviewDevTools,
} from "./windowManage";
import { createTray } from "./trayManage";
import { setIpcMainListener } from "./ipcHandlerManage";
import { setAppGlobalData, setAppListener, setSingleInstance } from "./appManage";
import createAppMenu from "./menuManage";
import { isLinux } from "../utils";

const init = () => {
  createMainWindow();
  createNotificationWindow();
  createMediaPreviewWindow();
  createAppMenu();
  createTray();
};

setAppGlobalData();
setIpcMainListener();
setSingleInstance();
setAppListener(init);

app.whenReady().then(() => {
  isLinux ? setTimeout(init, 300) : init();
  globalShortcut.register("Alt+CommandOrControl+I", () => {
    console.log("Alt+CommandOrControl+I");
    openMainTools();
  });
  globalShortcut.register("Alt+CommandOrControl+J", () => {
    console.log("Alt+CommandOrControl+J");
    openNotificationTools();
  });
  globalShortcut.register("Alt+CommandOrControl+K", () => {
    console.log("Alt+CommandOrControl+k");
    openMediaPreviewDevTools();
  });
});
