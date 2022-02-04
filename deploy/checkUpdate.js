
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
    list: {},
    cache: {},
    update: false
  }
  const server = await fs.readJson(path.join(generate, 'deploy/info.json'))
  const cachePath = path.join(target, '_cache.json')
  const cache = await loadCache(cachePath)

  server.forEach(({ flag, list, header, footer })=>{
    const updateList = {}
    const lastEdit = cache[flag] || {}
    const newEdit = {}

    update.list[flag] = updateList
    update.cache[flag] = newEdit

    const check = (id, edit)=>{
      if (lastEdit[id] !== edit){
        updateList[id] = true
        update.update = true
      }
      newEdit[id] = edit
    }
    list.forEach((item)=>check(item.id, item.edit))
    check('header', header.edit)
    check('footer', footer.edit)
    if (Object.keys(lastEdit).length !== Object.keys(newEdit).length){
      update.update = true
    }
  })

  if (update.update){
    await fs.outputFile(cachePath, JSON.stringify(update.cache))
  }

  return update
}

module.exports = checkUpdate
