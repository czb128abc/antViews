const copyFileSync = require('fs-copy-file-sync');
const { PWD } = process.env;
copyFileSync(`${PWD}/src/assets/site/icons/icon-128x128.png`, `${PWD}/dist/icons/icon-128x128.png`);
copyFileSync(`${PWD}/src/assets/site/icons/icon-192x192.png`, `${PWD}/dist/icons/icon-192x192.png`);
copyFileSync(`${PWD}/src/assets/site/icons/icon-512x512.png`, `${PWD}/dist/icons/icon-512x512.png`);
copyFileSync(`${PWD}/src/assets/site/favicon.png`, `${PWD}/dist/favicon.png`);
copyFileSync(`${PWD}/src/assets/site/pro_icon.svg`, `${PWD}/dist/pro_icon.svg`);
console.log('exec copy finish');
