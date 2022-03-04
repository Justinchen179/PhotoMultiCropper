const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  startDrag: (fileName) => {
    ipcRenderer.send('ondragstart', fileName)
  },
  sendPictures: (cropPictures, indexHeight, indexWidth, fileExt, imageUrl) => {
    console.log(
      'folderPath:',
      ipcRenderer.sendSync(
        'cropDone',
        cropPictures,
        indexHeight,
        indexWidth,
        fileExt,
        imageUrl
      )
    )
  }
})
