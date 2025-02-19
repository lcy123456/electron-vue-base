import { rmSync } from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import electron from "vite-electron-plugin";
import { customStart, loadViteEnv } from "vite-electron-plugin/plugin";
import pkg from "./package.json";
import { createHtmlPlugin } from "vite-plugin-html";
import legacy from "@vitejs/plugin-legacy";
// import visualizer from "rollup-plugin-visualizer";

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
        define: {
            __APP_VERSION__: JSON.stringify(pkg.version),
        },
        plugins: [
            vue(),
            electron({
                include: ["electron"],
                transformOptions: {
                    sourcemap,
                },
                plugins: [
                    ...(!!process.env.VSCODE_DEBUG
                        ? [
                              // Will start Electron via VSCode Debug
                              customStart(() =>
                                  console.log(
                                      /* For `.vscode/.debug.script.mjs` */ "[startup] Electron App",
                                  ),
                              ),
                          ]
                        : []),
                    // Allow use `import.meta.env.VITE_SOME_KEY` in Electron-Main
                    loadViteEnv(),
                ],
            }),
            // legacy({
            //   targets: ["defaults", "not IE 11"],
            // }),
            // visualizer({ open: true }),
            createHtmlPlugin({
                inject: {
                    data: {
                        PACKAGE_VERSION: pkg.version,
                    },
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
        build: {
            sourcemap: false,
            cssCodeSplit: true,
            chunkSizeWarningLimit: 500,
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                },
            },
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes("node_modules") && !id.includes("rc")) {
                            return id
                                .toString()
                                .split("node_modules/")[1]
                                .split("/")[0]
                                .toString();
                        }
                    },
                },
            },
        },
        css: {
            preprocessorOptions: {
                // 导入scss预编译程序
                scss: {
                    additionalData: `@use "@/styles/common.scss" as *;`,
                },
            },
        },
    };
});
