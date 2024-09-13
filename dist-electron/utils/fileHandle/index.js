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
  cacheFile: () => cacheFile,
  compareFiles: () => compareFiles,
  getFile: () => getFile,
  previewFile: () => previewFile,
  saveAsFile: () => saveAsFile
});
module.exports = __toCommonJS(stdin_exports);
var import_electron = require("electron");
var import_node_fs = require("node:fs");
var import_crypto = __toESM(require("crypto"));
var import_node_path = __toESM(require("node:path"));
const downloadsPath = import_electron.app.getPath("downloads");
const saveDownloadsPath = import_node_path.default.join(downloadsPath, "ET2 Desktop");
const createSaveDownloadsFolder = () => {
  return new Promise((resolve, reject) => {
    const isExists = (0, import_node_fs.existsSync)(saveDownloadsPath);
    isExists ? resolve(true) : (0, import_node_fs.mkdir)(saveDownloadsPath, (err) => {
      err ? reject(err) : resolve(true);
    });
  });
};
createSaveDownloadsFolder();
const cacheFile = ({ fileName, uint8Array }) => {
  return new Promise(async (resolve, reject) => {
    await createSaveDownloadsFolder();
    const buffer = Buffer.from(uint8Array);
    const filePath = import_node_path.default.join(saveDownloadsPath, fileName);
    const uniquePath = getUniqueFileName(filePath);
    (0, import_node_fs.writeFile)(uniquePath, buffer, "utf-8", async function(err) {
      if (err) {
        reject(err);
      } else {
        const hash = await getFileMd5(uniquePath);
        resolve({ savePath: uniquePath, saveHash: hash });
      }
    });
  });
};
const previewFile = async (filePath) => {
  return await import_electron.shell.openPath(filePath);
};
const saveAsFile = (data) => {
  const isString = typeof data === "string";
  return new Promise(async (resolve, reject) => {
    const saveRes = await import_electron.dialog.showSaveDialog({
      title: "\u6587\u4EF6\u53E6\u5B58\u4E3A",
      defaultPath: isString ? import_node_path.default.basename(data) : data.fileName
    });
    if (!saveRes.filePath)
      return;
    if (isString) {
      (0, import_node_fs.copyFile)(data, saveRes.filePath, async (err) => {
        err ? reject(err) : resolve(true);
      });
    } else {
      (0, import_node_fs.writeFile)(
        saveRes.filePath,
        Buffer.from(data.uint8Array),
        "utf-8",
        async function(err) {
          err ? reject(err) : resolve(true);
        }
      );
    }
  });
};
const getUniqueFileName = (filePath) => {
  let index = 0;
  let uniquePath = filePath;
  while ((0, import_node_fs.existsSync)(uniquePath)) {
    index++;
    const fileName = import_node_path.default.basename(filePath);
    const ext = import_node_path.default.extname(filePath);
    const baseName = fileName.slice(0, -ext.length);
    const numberedName = baseName + `(${index})` + ext;
    uniquePath = import_node_path.default.join(import_node_path.default.dirname(filePath), numberedName);
  }
  return uniquePath;
};
const compareFiles = async ({ filePath, fileHash }) => {
  const isExists = (0, import_node_fs.existsSync)(filePath);
  if (!isExists)
    return false;
  const hash = await getFileMd5(filePath);
  return fileHash === hash;
};
const getFileMd5 = (filePath, sizeLimit = 10 * 1024 * 1024) => {
  return new Promise((resolve, reject) => {
    const hash = import_crypto.default.createHash("md5");
    const stream = (0, import_node_fs.createReadStream)(filePath, { start: 0, end: sizeLimit });
    stream.on("data", (data) => {
      hash.update(data);
    });
    stream.on("end", () => {
      const md5 = hash.digest("hex");
      resolve(md5);
    });
    stream.on("error", (error) => {
      reject(error);
    });
  });
};
const getFile = ({ filePath }) => {
  return new Promise((reslove, reject) => {
    (0, import_node_fs.readFile)(filePath, (err, data) => {
      err ? reject(err) : reslove({ data, name: import_node_path.default.basename(filePath) });
    });
  });
};

//# sourceMappingURL=index.js.map