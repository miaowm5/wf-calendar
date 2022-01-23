
const path = require('path')
const http = require('http')
const https = require('https')
const fs = require('fs-extra')

const download = async (url, dest)=>{
  const file = fs.createWriteStream(dest)
  await new Promise((success, fail)=>{
    const proto = url.startsWith('https:') ? https : http
    proto.get(url, (response)=>{
      response.pipe(file)
      file.on('finish', ()=>{ file.close(success) })
    }).on('error', (err)=>{
      fail(err)
    })
  })
}

// 获取图片更新列表
const getList = async (generate, target)=>{
  const cachePath = path.join(target, 'deploy/bannerCache.json')
  const infoPath = path.join(generate, 'deploy/info.json')

  const newCache = {}
  const serverList = await fs.readJson(infoPath)
  let cache = {}
  if (fs.existsSync(cachePath)){ cache = await fs.readJson(cachePath) }

  const updateList = []
  serverList.forEach(({ flag, image: images })=>{
    images.forEach((image)=>{
      if (!cache[flag]){ cache[flag] = {} }
      if (!newCache[flag]){ newCache[flag] = {} }
      updateList.push({
        flag,
        image,
        type: cache[flag][image.id] === image.edit ? 'copy' : 'download'
      })
      newCache[flag][image.id] = image.edit
    })
  })
  await fs.outputFile(cachePath, JSON.stringify(newCache))
  await Promise.all(serverList.map(({ flag })=>{
    return fs.ensureDir(path.join(target, 'banner', flag))
  }))
  return updateList
}

// 处理图片的更新
const handleImage = async (image, target)=>{
  if (!image){ return }
  const filename = path.join(
    image.flag,
    `${image.image.id}.${image.image.format}`
  )
  const dest = path.join(target, 'banner', filename)
  if (image.type === 'copy'){
    const src = path.join(target, 'banner-old', filename)
    await fs.copyFile(src, dest)
  }else if (image.type === 'download'){
    await download(image.image.file, dest)
  }
}

const updateImage = async (generate, target)=>{
  // 将原本的 banner 目录备份到 banner-old 目录
  const newPath = path.join(target, 'banner')
  const oldPath = path.join(target, 'banner-old')
  await fs.ensureDir(newPath)
  await fs.remove(oldPath)
  await fs.rename(newPath, oldPath)
  // 获取图片列表
  const updateList = await getList(generate, target)
  // 执行图片的更新操作（下载或从 banner-old 目录复制）
  for (i = 0; i < updateList.length; i){
    // 同时并行的任务数量为 5 个
    const times = 5
    const handleList = []
    for (j = 0; j < times; j++){ handleList.push(handleImage(updateList[i+j], target)) }
    await Promise.all(handleList)
    i += times
  }
  // 删除 banner-old 目录
  await fs.remove(oldPath)
}

module.exports = updateImage
