const path = require('path')
const builder = require('electron-builder')

builder
  .build({
    projectDir: path.resolve(__dirname),
    mac: ['dmg'],
    win: ['nsis', 'portable'],
    config: {
      appId: 'personal.PhotoMultiCropper',
      productName: 'PhotoMultiCropper',
      directories: {
        output: 'build'
      },
      mac: {
        icon: path.resolve(__dirname, 'assets', 'logo.png')
      },
      win: {
        icon: path.resolve(__dirname, 'assets', 'logo.png')
      }
    }
  })
  .then(
    (data) => console.log(data),
    (err) => console.error(err)
  )
