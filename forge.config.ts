import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { VitePlugin } from '@electron-forge/plugin-vite';
// import {copy} from 'fs-extra';
// import path from 'path';

const config: ForgeConfig = {
  packagerConfig: {},
  rebuildConfig: {},
  makers: [new MakerSquirrel({}), new MakerZIP({}, ['darwin']), new MakerRpm({}), new MakerDeb({})],
  plugins: [
    new VitePlugin({
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // If you are familiar with Vite configuration, it will look really familiar.
      build: [
        {
          // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
          entry: 'src/main.ts',
          config: 'vite.main.config.ts',
        },
        {
          entry: 'src/preload.ts',
          config: 'vite.preload.config.ts',
        },
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'vite.renderer.config.ts',
        },
      ],
    }),
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'codepraycode',
          name: 'consonant-toolkit'
        },
        prerelease: true
      }
    }
  ],
  // copy: [
  //   {
  //     from: 'path/to/static/files',
  //     to: 'relative/path/in/out/directory'
  //   }
  // ],

  // hooks: {

  //   packageAfterCopy: async (config, buildPath, electronVersion, platform, arch) => {
  //     // Copy static files to the build directory
  //     // For example, if you have a directory named 'static' in your project
  //     console.log(buildPath, 'assets');
  //     await copy('assets', path.join(buildPath, 'assets'));
  //   },
  // }
};

export default config;
