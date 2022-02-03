
const path = require('path')
const fs = require('fs-extra')

const loadCache = async (cachePath)=>{
  let cache = {}
  if (fs.existsSync(cachePath)){ cache = await fs.readJson(cachePath) }
  return cache
}

// 比较数据相比上一次部署是否更新
const checkUpdate = async (generate, target)=>{
  const update = {
    list: { item: {} },
    cache: { item: {} },
    update: false
  }
  const server = await fs.readJson(path.join(generate, 'deploy/info.json'))
  const cachePath = path.join(target, '_cache.json')
  const cache = await loadCache(cachePath)

  server.forEach(({ flag, list })=>{
    const updateList = {}
    const lastEdit = cache[flag] || {}
    const newEdit = {}

    update.list.item[flag] = updateList
    update.cache.item[flag] = newEdit

    list.forEach((item)=>{
      if (lastEdit[item.id] !== item.edit){
        updateList[item.id] = true
        update.update = true
      }
      newEdit[item.id] = item.edit
    })
    if (Object.keys(lastEdit).length !== Object.keys(newEdit).length){
      update.update = true
    }
  })

  if (update.update){
    await fs.outputFile(cachePath, JSON.stringify(update.cache.item))
  }

  return update
}

module.exports = checkUpdate
