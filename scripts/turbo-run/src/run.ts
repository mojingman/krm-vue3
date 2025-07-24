import { execaCommand, getPackages } from '@kris/node-utils';

import { cancel, isCancel, select } from '@clack/prompts';

interface RunOptions {
  command?: string;
}

export async function run(options: RunOptions) {
  const { command } = options;
  if (!command) {
    console.error('Please enter the command to run');
    process.exit(1);
  }
  const { packages } = await getPackages();
  // const appPkgs = await findApps(process.cwd(), packages);
  // const websitePkg = packages.find(
  //   (item) => item.packageJson.name === '@kris/website',
  // );

  // 只显示有对应命令的包
  const selectPkgs = packages.filter((pkg) => {
    return (pkg?.packageJson as Record<string, any>)?.scripts?.[command];
  });

  const comboOptions = [
    {
      label: '🚀 Start All Dev Apps',
      value: '__combo_all__',
    },
  ];

  const selectOptions = [
    ...selectPkgs.map((item) => ({
      label: item?.packageJson.name,
      value: item?.packageJson.name,
    })),
    ...comboOptions,
  ];

  let selectPkg: string | symbol;

  if (selectOptions.length > 1) {
    selectPkg = await select<string>({
      message: `Select the app you need to run [${command}]:`,
      options: selectOptions,
    });

    if (isCancel(selectPkg) || !selectPkg) {
      cancel('👋 Has cancelled');
      process.exit(0);
    }
    if (selectPkg === '__combo_all__') {
      await Promise.all([
        execaCommand('pnpm -F @kris/playground run dev', { stdio: 'inherit' }), // 5555
        execaCommand('pnpm -F @kris/web-antd run dev', { stdio: 'inherit' }), // 5666
        execaCommand('pnpm -F @kris/web-ele run dev', { stdio: 'inherit' }), // 5777
        execaCommand('pnpm -F @kris/web-naive run dev', { stdio: 'inherit' }), // 5888
      ]);
      return;
    }
  } else {
    selectPkg = selectPkgs[0]?.packageJson?.name ?? '';
  }

  if (!selectPkg) {
    console.error('No app found');
    process.exit(1);
  }

  execaCommand(`pnpm --filter=${selectPkg} run ${command}`, {
    stdio: 'inherit',
  });
}

/**
 * 过滤app包
 * @param root
 * @param packages
 */
// async function findApps(root: string, packages: Package[]) {
//   // apps内的
//   const appPackages = packages.filter((pkg) => {
//     const viteConfigExists = fs.existsSync(join(pkg.dir, 'vite.config.mts'));
//     return pkg.dir.startsWith(join(root, 'apps')) && viteConfigExists;
//   });

//   return appPackages;
// }
