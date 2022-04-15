
const path = require('path')
const http = require('http')
const https = require('https')
const fs = require('fs-extra')

const download = async (url, dest)=>{
  const file = fs.createWriteStream(dest)
  await new Promise((success, fail)=>{
    const proto = url.startsWith('https:') ? https : http
    proto.get(url, {headers: { 'Cache-Control': 'no-cache' }}, (response)=>{
      response.pipe(file)
      file.on('finish', ()=>{ file.close(success) })
    }).on('error', (err)=>{
      fail(err)
    })
  })
}

// 获取图片更新列表
const getList = async (updateInfo, generate, target)=>{
  const infoPath = path.join(generate, 'deploy/info.json')
  const server = await fs.readJson(infoPath)
  const updateList = []
  server.forEach(({ flag, image: images, header, footer })=>{
    const update = { ...updateInfo.list[flag] }
    const updateContent = (data)=>{
      data.content.forEach((item)=>{
        if (item.type === 'image'){ update[item.id] = true }
      })
    }
    update.header && updateContent(header)
    update.footer && updateContent(footer)
    images.forEach(({ id, file, format })=>{
      updateList.push({
        file,
        filename: path.join(flag, `${id}.${format}`),
        type: update[id] ? 'copy' : 'download'
      })
    })
  })
  await Promise.all(server.map(({ flag })=>fs.ensureDir(path.join(target, 'banner', flag))))
  return updateList
}

// 处理图片的更新
const handleImage = async (image, target)=>{
  if (!image){ return }
  const { file, filename, type } = image
  const dest = path.join(target, 'banner', filename)
  if (type === 'copy'){
    const src = path.join(target, 'banner-old', filename)
    if (fs.existsSync(src)){
      await fs.copyFile(src, dest)
      return
    }
  }
  await download(file, dest)
}

const updateImage = async (info, generate, target)=>{
  // 将原本的 banner 目录备份到 banner-old 目录
  const newPath = path.join(target, 'banner')
  const oldPath = path.join(target, 'banner-old')
  await fs.ensureDir(newPath)
  await fs.remove(oldPath)
  await fs.rename(newPath, oldPath)
  // 获取图片列表
  const updateList = await getList(info, generate, target)
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
