import { join } from "node:path";
import {
    BrowserWindow,
    dialog,
    app,
    screen,
    MessageChannelMain,
    WebContents,
    ipcMain,
} from "electron";
import { isMac, isWin, Badge } from "../utils";
import { destroyTray } from "./trayManage";
import { getStore } from "./storeManage";
import { getIsForceQuit } from "./appManage";
import { traySetTitle } from "./trayManage";
import { handleUpdate } from "../utils/autoUpdater";

const url = process.env.VITE_DEV_SERVER_URL;
let mainWindow: BrowserWindow | null = null;
let mainBadge: Badge;
let notificationWindow: BrowserWindow | null = null;
let mediaPreviewWindow: BrowserWindow | null = null;
let mainWindow2 = null;

const store = getStore();

export function createMainWindow() {
    app.commandLine.appendSwitch("ignore-certificate-errors");
    mainWindow = new BrowserWindow({
        title: "ET2",
        icon: isMac
            ? join(global.pathConfig.publicPath, "/icons/ico.png")
            : join(global.pathConfig.publicPath, "/icons/logo.png"),
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
            webSecurity: false,
        },
    });

    if (url) {
        // Open devTool if the app is not packaged
        setTimeout(openMainTools, 2000);
        mainWindow.loadURL(url);
    } else {
        handleUpdate(mainWindow);
        mainWindow.loadFile(global.pathConfig.indexHtml);
    }

    mainWindow.on("close", (e) => {
        if (
            getIsForceQuit() ||
            !mainWindow.isVisible() ||
            store.get("closeAction") === "quit"
        ) {
            mainWindow = null;
            notificationWindow?.close();
            mediaPreviewWindow?.close();
            destroyTray();
        } else {
            e.preventDefault();
            if (isMac && mainWindow.isFullScreen()) {
                mainWindow.setFullScreen(false);
            }
            mainWindow?.hide();
        }
    });
    mainWebContents(mainWindow.webContents);
    if (isWin) {
        mainBadge = new Badge(mainWindow, {
            font: "10px arial",
            color: "#f23c34",
        });
    }
    global.mainWindow = mainWindow;

    let timer1 = null;
    let timer2 = null;
    function getLiij(str) {
        return new Promise((res, rej) => {
            try {
                mainWindow2.webContents.executeJavaScript(str).then((result) => {
                    // console.log('Child window content:', result);
                    // mainWindow.webContents.send("liji", "gunqiu-" + result);
                    res(result);
                });
            } catch (err) {
                res("");
            }
        });
    }
    async function getChildWindowContent() {
        if (mainWindow2) {
            // mainWindow2.webContents
            //     .executeJavaScript(
            //         `document.querySelector('.LiveMarket').getElementsByClassName('MarketT')[1].innerHTML`,
            //     )
            //     .then((result) => {
            //         // console.log('Child window content:', result);
            //         mainWindow.webContents.send("liji", "gunqiu-" + result);
            //     });
            let gunqiuData = "";
            let jinriData = "";
            try {
                gunqiuData = await getLiij(
                    `document.querySelector('.LiveMarket')?.getElementsByClassName('MarketT')[1]?.innerHTML`,
                );
            } catch (err) {
                console.log(111, err);
            }
            try {
                jinriData = await getLiij(
                    `document.querySelector('.NonLiveMarket')?.getElementsByClassName('MarketT')[1]?.innerHTML`,
                );
            } catch (err) {
                console.log(2222, err);
            }
            // console.log("gunqiuData---gunqiuData", gunqiuData);
            mainWindow.webContents.send("liji", {
                gunqiuData,
                jinriData,
            });
            // mainWindow2.webContents
            //     .executeJavaScript(
            //         `document.querySelector('.NonLiveMarket').getElementsByClassName('MarketT')[1].innerHTML`,
            //     )
            //     .then((result) => {
            //         // console.log('Child window content:', result);
            //         mainWindow.webContents.send("liji", "jinri-" + result);
            //     });
        }
    } 

    ipcMain.handle("liji-open", (event, arg) => {
        console.log("arg--arg", arg);
        mainWindow2 && mainWindow2.close();
        mainWindow2 = new BrowserWindow({
            height: 563,
            useContentSize: true,
            width: 1000,
            webPreferences: {
                nodeIntegration: true,
                webSecurity: false,
            },
        });
        mainWindow2.loadURL(`${arg}/en/euro/football`);

        mainWindow2.on('close', () => {
            console.log('关闭');
            mainWindow2 = null;
        }) 
        mainWindow2.hide();
    });
    ipcMain.handle("liji-start", () => {
        console.log("liji", "主进程响应"); // 可以回复消息
        clearInterval(timer1);
        clearInterval(timer2);
        timer1 = setInterval(() => {
            getChildWindowContent();
            // ipcMain.
        }, 1000);
        timer2 = setInterval(() => {
            try {
                mainWindow2.webContents.executeJavaScript(`$('.RefreshBtn').click()`);
                mainWindow.webContents.send("liji-error", 1);
            } catch (err) {
                console.log(333, err);
                mainWindow.webContents.send("liji-error");
            }
        }, 1000);
    });
    ipcMain.handle("liji-close", () => {
        console.log("liji-close", "主进程响应"); // 可以回复消息
        clearInterval(timer1);
        clearInterval(timer2);
        mainWindow2 && mainWindow2.close();
    });
    return mainWindow;
}

// utils
export const isExistMainWindow = (): boolean =>
    !!mainWindow && !mainWindow?.isDestroyed();

export const closeWindow = () => {
    if (!mainWindow) return;
    mainWindow.close();
};

export const showSelectDialog = async (options: Electron.OpenDialogOptions) => {
    if (!mainWindow) throw new Error("main window is undefined");
    return await dialog.showOpenDialog(mainWindow, options);
};
export const minimize = () => {
    if (!mainWindow) return;
    mainWindow.minimize();
};
export const updateMaximize = () => {
    if (!mainWindow) return;
    if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
    } else {
        mainWindow.maximize();
    }
};
export const toggleHide = () => {
    if (!mainWindow) return;
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
};
export const toggleMinimize = () => {
    if (!mainWindow) return;
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
export const showWindow = () => {
    // console.log(mainWindow.isMinimized(), mainWindow.isVisible())
    if (!mainWindow) return;
    if (mainWindow.isMinimized()) {
        mainWindow.restore();
    }
    mainWindow.show();
};
export const hideWindow = () => {
    if (!mainWindow) return;
    mainWindow.hide();
};
export const setBadgeCount = (count) => {
    if (isWin) {
        mainBadge.update(Number(count));
        return;
    }
    traySetTitle(count ? (Number(count) > 99 ? "99+" : count + "") : "");
    app.setBadgeCount(Number(count));
};

export const blinkWindow = (val: boolean) => {
    if (!mainWindow) return;
    mainWindow.flashFrame(val);
};

export const openMainTools = () => {
    if (!mainWindow) return;
    mainWindow.webContents.openDevTools({
        mode: "detach",
    });
};

const mainWebContents = (webContents: WebContents) => {
    webContents.on("did-fail-load", (_, errorCode) => {
        switch (errorCode) {
            case -6:
                url
                    ? mainWindow.loadURL(url)
                    : mainWindow.loadFile(global.pathConfig.indexHtml);
                break;
        }
    });
};

export function createNotificationWindow() {
    notificationWindow = new BrowserWindow({
        width: 320,
        height: 90,
        frame: false,
        skipTaskbar: true,
        show: false,
        transparent: true,
        roundedCorners: false,
        webPreferences: {
            preload: global.pathConfig.preload,
        },
    });
    // if (url) {
    //   setTimeout(openNotificationTools, 6000);
    // }

    notificationWindow.loadFile(global.pathConfig.notificationHtml);
    notificationWindow.setAlwaysOnTop(true, "status"); //screen-saver
    resetPosition();

    notificationWindow.on("close", (e) => {
        notificationWindow = null;
    });
}

export const openNotificationTools = () => {
    if (!notificationWindow) return;
    notificationWindow.webContents.openDevTools({
        mode: "detach",
    });
};

export const notificationShow = () => {
    // notificationWindow.show();
    notificationWindow.showInactive();
};

export const notificationHide = () => {
    notificationWindow.hide();
};

export const notificationHeight = (height: number) => {
    notificationWindow.setSize(320, height);
    resetPosition();
};

export const resetPosition = () => {
    const mainScreen = screen.getPrimaryDisplay();
    const { width, height } = mainScreen.workAreaSize;
    const notificationWindowBounds = notificationWindow.getBounds();
    const x = width - notificationWindowBounds.width - 10;
    const y = height - notificationWindowBounds.height - 10;
    notificationWindow.setPosition(x, y);
};

export function createMediaPreviewWindow() {
    mediaPreviewWindow = new BrowserWindow({
        frame: false,
        skipTaskbar: true,
        show: false,
        // titleBarStyle: "hiddenInset",
        transparent: true,
        webPreferences: {
            preload: global.pathConfig.mediaPreviewPreload,
        },
    });
    if (url) {
        // setTimeout(openMediaPreviewDevTools, 6000);
        mediaPreviewWindow.loadURL(url);
    } else {
        mediaPreviewWindow.loadFile(global.pathConfig.indexHtml);
    }
    mediaPreviewSetSize();

    mediaPreviewWindow.on("close", (e) => {
        mediaPreviewWindow = null;
    });
}

export const mediaPreviewSetSize = () => {
    const mainScreen = screen.getPrimaryDisplay();
    const { width, height } = mainScreen.workAreaSize;
    mediaPreviewWindow.setSize(width, height);
    mediaPreviewWindow.setPosition(0, 0);
};

export const mediaPreviewShow = () => {
    mediaPreviewWindow.show();
};

export const mediaPreviewHide = () => {
    mediaPreviewWindow.hide();
    mainWindow.focus();
};

export const openMediaPreviewDevTools = () => {
    if (!mediaPreviewWindow) return;
    mediaPreviewWindow.webContents.openDevTools({
        mode: "detach",
    });
};

export const handleWindowPort = () => {
    if (!mainWindow || !notificationWindow || !mediaPreviewWindow) return;
    const { port1, port2 } = new MessageChannelMain();
    mainWindow.webContents.postMessage("notificationPort", null, [port1]);
    notificationWindow.webContents.postMessage("notificationPort", null, [port2]);

    const { port1: port3, port2: port4 } = new MessageChannelMain();
    mainWindow.webContents.postMessage("mediaPreviewPort", null, [port3]);
    mediaPreviewWindow.webContents.postMessage("mediaPreviewPort", null, [port4]);
};
