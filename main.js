const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')
const Jimp = require('jimp')

function createWindow() {
  const win = new BrowserWindow({
    width: 1300,
    height: 735,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
  // win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

ipcMain.on(
  'cropDone',
  (event, cropPictures, indexHeight, indexWidth, fileExt, cropImagePath) => {
    let folderName = cropImagePath.split('.')

    folderName = `${folderName[folderName.length - 1]}`

    const folderNamePath = cropImagePath.replace(`.${folderName}`, '')

    event.returnValue = `${folderNamePath}`
    cropPictures.forEach((e, i) => {
      const cropx = e.left.replace('px', '') * indexWidth
      const cropy = e.top.replace('px', '') * indexHeight
      const cropwidth = e.width.replace('px', '') * indexWidth
      const cropheight = e.height.replace('px', '') * indexHeight

      fs.access(
        `${folderNamePath}/${e.pictureName}.${fileExt}`,
        fs.constants.F_OK,
        (err) => {
          if (err) {
            Jimp.read(cropImagePath, (err, cropImage) => {
              if (err) throw err
              cropImage
                .crop(cropx, cropy, cropwidth, cropheight)
                .quality(100)
                .write(`${folderNamePath}/${e.pictureName}.${fileExt}`)
            })
          } else {
            Jimp.read(cropImagePath, (err, cropImage) => {
              if (err) throw err
              cropImage
                .crop(cropx, cropy, cropwidth, cropheight)
                .quality(100)
                .write(
                  `${folderNamePath}/${
                    e.pictureName
                  }_FileExist${new Date().getMilliseconds()}${new Date().getSeconds()}.${fileExt}`
                )
            })
          }
        }
      )
    })
  }
)

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
