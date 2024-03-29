import 'dotenv/config'
import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron';
import path from 'path';
import { updateElectronApp } from 'update-electron-app';
import logger from 'electron-log/main';
import fs from 'fs';
import { FileSendParams, IDirFile } from './utils/types';
import bucket from './lib/supabase/storage';
import config from './config.json';
import { insertDbRow } from './lib/supabase/database';
import { MaterialTbRow } from './lib/supabase/types';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}


const isDevelopment = !app.isPackaged;

updateElectronApp({ logger });


const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, '../app_assets', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  if(isDevelopment) mainWindow.webContents.openDevTools();
};



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', ()=>{
  
  // Register protocol for serving static files
  // session.defaultSession.protocol.registerFileProtocol('static', (request, callback) => {
  //   const fileUrl = request.url.replace('static://', '');
  //   const filePath = path.join(app.getAppPath(), '.webpack/renderer', fileUrl);
  //   callback(filePath);
  // });
  
  
  createWindow();
} );

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
app.whenReady().then(()=>{
  
    ipcMain.handle('app:version', ()=>{
        return app.getVersion();
    });


    ipcMain.handle('static:path', ()=>{

        if (isDevelopment) return '/static';
        return path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/static`);
    });

    ipcMain.handle("dialog:openDirectory", () => {

        // ! Take care of error cases
        const dirPath = dialog.showOpenDialogSync({
            properties: ['openDirectory']
        })

        return dirPath;
    });


    ipcMain.handle("dir:readable", (_, {dir}:{dir:string}) => {

      try {
        fs.accessSync(dir, fs.constants.R_OK);
        return true;
      } catch (err) {
        console.error(err);

        return false;
      }
    });


    ipcMain.handle("dir:details", (_, {dir}:{dir:string}) => {


        return new Promise((resolve, rejected)=>{

            fs.readdir(dir, (err, files)=> {

                if (err) {
                    console.error("Error occured:", err);

                    rejected("Error loading directory details");
                    return
                }


                const details = {
                    name: path.basename(dir),
                    size: 0,
                    items: files.length
                }

                const dir_files:IDirFile[] = [];

                files.forEach((file:string)=>{
                    const fileDetails = fs.lstatSync(path.join(dir, file));

                    if (fileDetails.isDirectory()) return;

                    details.size += fileDetails.size;

                    const ext = path.extname(file);
                    const basename = file.replace(ext, '');

                    dir_files.push({
                      name: file,
                      size: fileDetails.size,
                      ext,
                      basename,
                      path: path.join(dir, file)
                    })
                });


                resolve([details, dir_files]);

            })
        })
    });



    ipcMain.handle("file:open", async (_, {path}:{path:string}) => {
      // console.log("Opening:", path)
      await shell.openExternal("file://"+path);
    });

    ipcMain.handle("file:send", async(_, {params}:{params:FileSendParams})=>{

      // const path = `${material.title}.${material.format}`

      // console.log("Uploading:", params.path);
      // console.log(params.name);

      const file_buffer = fs.readFileSync(params.path);

      const blob = new Blob([file_buffer]);


      const {data, error} = await bucket.upload({
          path: params.path,
          asset: blob
      });


      if (error) {

          if (error.message.includes("already exists")) {
              // stat_pointer.duplicates += 1;

              throw new Error("duplicate");
          } else {
              // stat_pointer.failed += 1;
              // stat_pointer.failed_files.push(pathname);
          }

          return null;
      }

      if (!data) {
        throw new Error("No Data");
      }

      
      
      const meta_data = {
          title: params.name,
          user: config.userId,
          asset_access: data.access,
          asset_download: data.download,
          asset_id: data.id,
          asset_type: params.format
      }

      
      const material = await insertDbRow<MaterialTbRow>(
          meta_data as MaterialTbRow
      )
          
      // // stat_pointer.uploaded += 1;
      return material;
    })

})
