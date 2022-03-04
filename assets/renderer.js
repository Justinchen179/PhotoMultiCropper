document.addEventListener('dragover', (e) => {
  e.preventDefault()
  e.stopPropagation()
})

let dropIndex = false
let fileIndex = 0
let imagePath = ''

document.addEventListener('drop', (event) => {
  if (dropIndex === true) {
    event.preventDefault()
    event.stopPropagation()

    if (window.confirm('確認清空並重新載入？') === true) {
      location.reload()
    }
  } else {
    dropIndex = true
  }

  for (const f of event.dataTransfer.files) {
    fileIndex++

    if (fileIndex > 1) {
      alert('請一次放一張圖')
      event.preventDefault()
      event.stopPropagation()
      location.reload()
    }

    let fileNameSplit = f.name

    fileNameSplit = fileNameSplit.split('.')

    const fileExt = fileNameSplit[fileNameSplit.length - 1]

    if (fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'png') {
      imagePath = f.path
    } else {
      alert('檔案種類錯誤')
      event.preventDefault()
      event.stopPropagation()
    }
  }

  document.querySelector('#target').src = imagePath
  document.querySelector('#photoHint').style.display = 'none'

  Jcrop.attach('target')

  document.querySelector('#reloadBtn').onclick = () => {
    if (window.confirm('確認清除？') === true) {
      location.reload()
    }
  }

  function checkNameIsRepeat(pictures) {
    const outputName = []

    pictures.map((e, i) => (outputName[i] = e.pictureName))

    for (let i = 0; i < outputName.length; i++) {
      for (let j = i + 1; j < outputName.length; j++) {
        if (outputName[i] === outputName[j]) {
          return true
        }
      }
    }

    return false
  }

  const cropPictures = []

  document.querySelector('#cropBtn').onclick = () => {
    const naturalHeight = document.querySelector('#target').naturalHeight
    const naturalWidth = document.querySelector('#target').naturalWidth
    const displayHeight = document.querySelector('#target').offsetHeight
    const displayWidth = document.querySelector('#target').offsetWidth
    const indexHeight = naturalHeight / displayHeight
    const indexWidth = naturalWidth / displayWidth
    const top = document.querySelector('.jcrop-widget ').style.top
    const left = document.querySelector('.jcrop-widget ').style.left
    const width = document.querySelector('.jcrop-widget ').style.width
    const height = document.querySelector('.jcrop-widget ').style.height
    let numberOfPicture = 0
    let names = document.querySelector('#inputName').value

    document.querySelector('#updateBtn').style.visibility = 'hidden'
    names = names.replace(' ', '').replace('/', '').replace('\n', '').split(',')
    numberOfPicture = cropPictures.length
    document.querySelector('#hint').innerHTML = `新增第 ${
      numberOfPicture + 1 + 1
    } 張`
    document.querySelector('#hint2').innerHTML = ' '

    if (numberOfPicture >= 99) {
      document.querySelector('#cropBtn').disabled = true
      document.querySelector('#hint').innerHTML = '到達上限'
      document.querySelector('#hint2').innerHTML = ' '
    }

    cropPictures[numberOfPicture] = {
      pictureName:
        names[numberOfPicture] === undefined
          ? numberOfPicture
          : names[numberOfPicture] === ''
          ? numberOfPicture
          : names[numberOfPicture],
      top,
      left,
      width,
      height
    }

    const newDiv = document.createElement('button')

    newDiv.id = `button${numberOfPicture}`
    newDiv.style = 'min-width:50px'

    newDiv.onclick = () => {
      const top = cropPictures[numberOfPicture].top
      const left = cropPictures[numberOfPicture].left
      const width = cropPictures[numberOfPicture].width
      const height = cropPictures[numberOfPicture].height

      document.querySelector('.jcrop-widget').style.top = top
      document.querySelector('.jcrop-widget').style.left = left
      document.querySelector('.jcrop-widget').style.width = width
      document.querySelector('.jcrop-widget').style.height = height
      document.querySelector('.t').style.height = top
      document.querySelector('.t').style.width = width
      document.querySelector('.t').style.left = left

      document.querySelector('.l').style.width = left
      document.querySelector('.r').style.width =
        displayWidth - left.replace('px', '') - width.replace('px', '') + 'px'
      document.querySelector('.b').style.height =
        displayHeight - height.replace('px', '') - top.replace('px', '') + 'px'
      document.querySelector('.b').style.width = width
      document.querySelector('.b').style.left = left
      document.querySelector('#hint').innerHTML = `修改中：${
        cropPictures[numberOfPicture].pictureName
      } (第 ${numberOfPicture + 1} 張)`
      document.querySelector('#hint2').innerHTML = '點擊「新增裁切」加入新裁切'

      document.querySelector('#updateBtn').style.visibility = 'visible'

      document.querySelector('#updateBtn').onclick = () => {
        const top = document.querySelector('.jcrop-widget').style.top
        const left = document.querySelector('.jcrop-widget').style.left
        const width = document.querySelector('.jcrop-widget').style.width
        const height = document.querySelector('.jcrop-widget').style.height

        cropPictures[numberOfPicture] = {
          pictureName:
            names[numberOfPicture] === undefined
              ? numberOfPicture
              : names[numberOfPicture] === ''
              ? numberOfPicture
              : names[numberOfPicture],
          top,
          left,
          width,
          height
        }
      }
    }

    document.querySelector('#renameBtn').onclick = () => {
      let names = document.querySelector('#inputName').value

      names = names
        .replace(' ', '')
        .replace('/', '')
        .replace('\n', '')
        .split(',')
      cropPictures.map((e, i) => {
        const NewName =
          names[i] === undefined ? i + 1 : names[i] === '' ? i + 1 : names[i]

        document.querySelector(`#button${i}`).innerHTML = NewName
        e.pictureName = NewName
        return e
      })
    }

    document
      .querySelector('#nameBtn')
      .parentNode.insertBefore(newDiv, document.querySelector('#nameBtn'))
    cropPictures.map((e, i) => {
      const NewName =
        names[i] === undefined ? i + 1 : names[i] === '' ? i + 1 : names[i]

      document.querySelector(`#button${i}`).innerHTML = NewName
      e.pictureName = NewName
      return e
    })

    document.querySelector('#cropDone').onclick = () => {
      if (window.confirm('確認開始裁圖？') === true) {
        if (checkNameIsRepeat(cropPictures) === false) {
          const fileExt = document.querySelector('#fileExt').value

          window.electron.sendPictures(
            cropPictures,
            indexHeight,
            indexWidth,
            fileExt,
            imagePath
          )
        } else {
          alert('檔名重複')
        }
      }
    }
  }
})
