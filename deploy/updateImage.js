
const path = require('path')
const http = require('http')
const https = require('https')
const fs = require('fs-extra')
const { get: getImageDir } = require('../common/serverFlag')

const download = async (url, dest)=>{
  console.log(`Download banner from ${url}`)
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
const getList = async (current, target)=>{
  const cacheFile = path.join(target, 'imageCache.json')
  let cache = {}
  if (fs.existsSync(cacheFile)){
    cache = await fs.readFile(cacheFile)
    cache = JSON.parse(cache.toString())
  }
  let newFile = await fs.readFile(current)
  newFile = JSON.parse(newFile.toString())

  const updateList = []
  const serverList = []
  newFile.forEach((serverData)=>{
    const server = serverData.server
    serverList.push(server)
    serverData.image.forEach((image)=>{
      if (!cache[server]){ cache[server] = {} }
      if (cache[server][image.id] !== image.edit){
        cache[server][image.id] = image.edit
        updateList.push({server, image, type: 'download'})
      }else{
        updateList.push({server, image, type: 'copy'})
      }
    })
  })
  await fs.writeFile(cacheFile, JSON.stringify(cache))
  await Promise.all(serverList.map((server)=>{
    return fs.ensureDir(path.join(target, 'banner', getImageDir(server)))
  }))
  return updateList
}
// 处理图片的更新
const handleImage = async (image, target)=>{
  if (!image){ return }
  const filename = path.join(
    getImageDir(image.server),
    `${image.image.id}.${image.image.format}`
  )
  const dest = path.join(target, 'banner', filename)
  if (image.type === 'copy'){
    const src = path.join(target, 'banner-old', filename)
    await fs.copyFile(src, dest)
  }
  if (image.type === 'download'){
    await download(image.image.file, dest)
  }
}

const updateImage = async (current, target)=>{
  await fs.ensureDir(path.join(target, 'banner'))
  await fs.remove(path.join(target, 'banner-old'))
  await fs.rename(path.join(target, 'banner'), path.join(target, 'banner-old'))
  const updateList = await getList(current, target)
  for (i = 0; i < updateList.length; i){
    // 同时并行的任务数量为 5 个
    const times = 5
    const handleList = []
    for (j = 0; j < times; j++){ handleList.push(handleImage(updateList[i+j], target)) }
    await Promise.all(handleList)
    i += times
  }
  await fs.remove(path.join(target, 'banner-old'))
}

module.exports = updateImage
