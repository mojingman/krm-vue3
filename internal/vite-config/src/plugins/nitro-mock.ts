import type { PluginOption } from 'vite';

import type { NitroMockPluginOptions } from '../typing';

import http from 'node:http';

import { colors, consola, getPackage } from '@kris/node-utils';

import { build, createDevServer, createNitro, prepare } from 'nitropack';

const hmrKeyRe = /^runtimeConfig\.|routeRules\./;

let nitroServerStarted = false; // 标记是否启动过，避免重复启动
let nitroServerPromise: null | Promise<void> = null; // 避免重复启动时同时调用runNitroServer

export const viteNitroMockPlugin = ({
  mockServerPackage = '@kris/backend-mock',
  port = 5320,
  verbose = true,
}: NitroMockPluginOptions = {}): PluginOption => {
  return {
    async configureServer(server) {
      if (nitroServerStarted) {
        // 已启动，直接打印地址
        patchPrintUrls(server, port);
        return;
      }

      // 检测端口是否被占用及服务是否运行
      const isRunning = await checkMockServerRunning(port);
      if (isRunning) {
        verbose &&
          consola.log(
            `Mock server already running on port ${port}, skip starting again.`,
          );
        nitroServerStarted = true;
        patchPrintUrls(server, port);
        return;
      }

      // 尝试启动 mock server，避免多次调用同时启动
      if (!nitroServerPromise) {
        const pkg = await getPackage(mockServerPackage);
        if (!pkg) {
          consola.log(
            `Package ${mockServerPackage} not found. Skip mock server.`,
          );
          return;
        }
        nitroServerPromise = runNitroServer(pkg.dir, port, verbose)
          .then(() => {
            nitroServerStarted = true;
          })
          .catch((error) => {
            consola.error('Failed to start KRIS Mock Server:', error);
            nitroServerStarted = false;
          });
      }

      await nitroServerPromise;

      patchPrintUrls(server, port);
    },
    enforce: 'pre',
    name: 'vite:mock-server',
  };
};

function patchPrintUrls(server: any, port: number) {
  const _printUrls = server.printUrls;
  server.printUrls = () => {
    _printUrls();
    consola.log(
      `  ${colors.green('➜')}  ${colors.bold('KRIS Mock Server')}: ${colors.cyan(`http://localhost:${port}/api`)}`,
    );
  };
}

// 判断 mock server 是否已启动并且返回200
async function checkMockServerRunning(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const req = http.request(
      {
        hostname: 'localhost',
        port,
        path: '/api',
        method: 'GET',
        timeout: 2000,
      },
      (res) => {
        resolve(res.statusCode === 200);
      },
    );
    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
    req.end();
  });
}

async function runNitroServer(rootDir: string, port: number, verbose: boolean) {
  let nitro: any;
  const reload = async () => {
    if (nitro) {
      verbose && consola.info('Restarting dev server...');
      if ('unwatch' in nitro.options._c12) {
        await nitro.options._c12.unwatch();
      }
      await nitro.close();
    }
    nitro = await createNitro(
      {
        dev: true,
        preset: 'nitro-dev',
        rootDir,
      },
      {
        c12: {
          async onUpdate({ getDiff, newConfig }) {
            const diff = getDiff();
            if (diff.length === 0) return;

            verbose &&
              consola.info(
                `Nitro config updated:\n${diff
                  .map((entry) => `  ${entry.toString()}`)
                  .join('\n')}`,
              );

            await (diff.every((e) => hmrKeyRe.test(e.key))
              ? nitro.updateConfig(newConfig.config)
              : reload());
          },
        },
        watch: true,
      },
    );

    nitro.hooks.hookOnce('restart', reload);

    const server = createDevServer(nitro);

    // 监听端口时捕获错误，防止端口被占用导致崩溃
    try {
      await server.listen(port, { showURL: false });
    } catch (error: any) {
      if (error.code === 'EADDRINUSE') {
        throw new Error(`Port ${port} is already in use.`);
      }
      throw error;
    }

    await prepare(nitro);
    await build(nitro);

    if (verbose) {
      consola.success(colors.bold(colors.green('KRIS Mock Server started.')));
    }
  };

  return await reload();
}
