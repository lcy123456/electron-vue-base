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
var import_badge_generator = __toESM(require("./badge_generator.js"));
const badgeDescription = "New notification";
const UPDATE_BADGE_EVENT = "update-badge";
let currentOverlayIcon = { image: null, badgeDescription };
module.exports = class Badge {
  constructor(win, opts = {}) {
    this.win = win;
    this.opts = opts;
    this.generator = new import_badge_generator.default(win, opts);
    this.initListeners();
    this.win.on("closed", () => {
      this.win = null;
    });
    this.win.on("show", () => {
      this.win.setOverlayIcon(
        currentOverlayIcon.image,
        currentOverlayIcon.badgeDescription
      );
    });
  }
  update(badgeNumber) {
    if (badgeNumber) {
      this.generator.generate(badgeNumber).then((base64) => {
        const image = import_electron.nativeImage.createFromDataURL(base64);
        currentOverlayIcon = {
          image,
          badgeDescription
        };
        this.win.setOverlayIcon(
          currentOverlayIcon.image,
          currentOverlayIcon.badgeDescription
        );
      });
    } else {
      currentOverlayIcon = {
        image: null,
        badgeDescription
      };
      this.win.setOverlayIcon(
        currentOverlayIcon.image,
        currentOverlayIcon.badgeDescription
      );
    }
  }
  initListeners() {
    import_electron.ipcMain.on(UPDATE_BADGE_EVENT, (event, badgeNumber) => {
      if (this.win) {
        this.update(badgeNumber);
      }
      event.returnValue = "success";
    });
  }
};

//# sourceMappingURL=index.js.map