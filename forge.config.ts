import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { MakerDMG } from '@electron-forge/maker-dmg';
import { MakerWix } from '@electron-forge/maker-wix';
import { VitePlugin } from '@electron-forge/plugin-vite';
// import {copy} from 'fs-extra';
import path from 'path';

const config: ForgeConfig = {
  packagerConfig: {
    icon: path.join(__dirname, 'app_assets/icon') // no file extension required
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
       // An URL to an ICO file to use as the application icon (displayed in Control Panel > Programs and Features).
        iconUrl: path.join(__dirname, 'app_assets', 'icon.ico'),
        // The ICO file to use as the icon for the generated Setup.exe
        setupIcon: path.join(__dirname, 'app_assets', 'icon.ico')
    }),
    new MakerZIP({}, ['darwin']),
    new MakerRpm({}),
    new MakerDeb({
        options: {
          maintainer: 'codepraycode',
          homepage: 'https://github.com/codepraycode',
          icon: path.join(__dirname, 'app_assets', 'icon.png')
        }
    }),
    new MakerDMG({
       icon: path.join(__dirname, 'app_assets', 'icon.icns')
    }),
    new MakerWix({
      icon: path.join(__dirname, 'app_assets', 'icon.ico')
    }),
    // {
    //   name: '@electron-forge/maker-deb',
    //   config: {
    //     options: {
    //       maintainer: 'codepraycode',
    //       homepage: 'https://github.com/codepraycode',
    //       icon: path.join(__dirname, 'app_assets', 'icon.png')
    //     }
    //   }
    // }
  ],
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
  ]
};

export default config;
