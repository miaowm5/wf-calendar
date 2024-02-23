
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
    list: {},      // 记录当前版本相较此前版本的更新列表，用于处理后续图片数据如何更新
    cache: {},     // 记录当前版本所有数据的更新时间，供下次部署时比较
    update: false, // 此次更新检查的最终结果
  }
  const server = await fs.readJson(path.join(generate, 'deploy/info.json'))
  const cachePath = path.join(target, '_cache.json')
  const cache = await loadCache(cachePath)

  server.forEach(({ flag, list, die, header, footer })=>{
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
    // 按照ID依序比较数据更新时间
    list.forEach((item)=>check(item.id, item.edit))
    if (die){ die.forEach((item)=>check(item.id, item.edit)) }
    check('header', header.edit)
    check('footer', footer.edit)
    // 比较缓存数据长度以及当前数据长度，从而处理数据删除的情况
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
