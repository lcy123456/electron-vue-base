import { rmSync } from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import electron from "vite-electron-plugin";
import { customStart, loadViteEnv } from "vite-electron-plugin/plugin";
import preload from "vite-plugin-electron";
import pkg from "./package.json";

let preloadHasReady = false;

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
    rmSync("dist-electron", { recursive: true, force: true });

    const sourcemap = command === "serve" || !!process.env.VSCODE_DEBUG;

    return {
        resolve: {
            alias: {
                "@": path.join(__dirname, "src"),
            },
        },
        plugins: [
            vue(),
            electron({
                include: ["electron/main"],
                transformOptions: {
                    sourcemap,
                },
                plugins: [
                    customStart((args) => {
                        if (process.env.VSCODE_DEBUG) {
                            // Start Electron via VSCode
                            console.log(
                                /* For `.vscode/.debug.script.mjs` */ "[startup] Electron App",
                            );
                        } else {
                            if (preloadHasReady) {
                                args?.startup();
                            } else {
                                console.log("[startup] waiting for preload");
                            }
                        }
                    }),
                    // Allow use `import.meta.env.VITE_SOME_KEY` in Main process
                    loadViteEnv(),
                ],
            }),
            // Preload scripts
            preload({
                entry: ["electron/preload/index.ts"],
                vite: {
                    build: {
                        minify: false,
                        outDir: "dist-electron/preload",
                    },
                },
                onstart(args) {
                    if (preloadHasReady) {
                        args.reload();
                    } else {
                        preloadHasReady = true;
                        args.startup();
                    }
                },
            }),
        ],
        server: !!process.env.VSCODE_DEBUG
            ? (() => {
                  const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL);
                  return {
                      host: url.hostname,
                      port: +url.port,
                  };
              })()
            : undefined,
        clearScreen: false,
    };
});
