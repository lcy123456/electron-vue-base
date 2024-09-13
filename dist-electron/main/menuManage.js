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
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_electron = require("electron");
var import_utils = require("../utils");
const createAppMenu = () => {
  if (import_utils.isMac) {
    const template = [
      {
        label: import_electron.app.getName(),
        submenu: [
          { label: "\u5173\u4E8E", role: "about" },
          { type: "separator" },
          { label: "\u9690\u85CF", role: "hide" },
          { type: "separator" },
          { label: "\u590D\u5236", accelerator: "CmdOrCtrl+C", role: "copy" },
          { label: "\u7C98\u8D34", accelerator: "CmdOrCtrl+V", role: "paste" },
          { label: "\u526A\u5207", accelerator: "CmdOrCtrl+X", role: "cut" },
          { label: "\u64A4\u9500", accelerator: "CmdOrCtrl+Z", role: "undo" },
          { label: "\u91CD\u505A", accelerator: "Shift+CmdOrCtrl+Z", role: "redo" },
          { label: "\u5168\u9009", accelerator: "CmdOrCtrl+A", role: "selectAll" },
          {
            label: "\u9000\u51FA",
            accelerator: "Command+Q",
            click: () => {
              global.forceQuit = true;
              import_electron.app.quit();
            }
          }
        ]
      },
      {
        label: "\u7A97\u53E3",
        role: "window",
        submenu: [
          { label: "\u6700\u5C0F\u5316", role: "minimize", accelerator: "Command+W" },
          { label: "\u5173\u95ED", role: "close" }
        ]
      }
    ];
    import_electron.Menu.setApplicationMenu(import_electron.Menu.buildFromTemplate(template));
  } else {
    import_electron.Menu.setApplicationMenu(null);
  }
};
var stdin_default = createAppMenu;

//# sourceMappingURL=menuManage.js.map