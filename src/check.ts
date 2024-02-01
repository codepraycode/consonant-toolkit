import path from 'path';
import fs from 'fs'

const icon_path = path.join(__dirname, '../app_assets', 'icon.png')

console.log(icon_path, fs.existsSync(icon_path));