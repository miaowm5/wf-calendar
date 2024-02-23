
const notion = require('./notion')
const loadList = require('./getList')
const getBlock = require('./getBlock')
const parseData = require('./parseData')

const loadDatabse = async (server)=>{
  // 获取各个日历页面的banner、footer以及日历数据库
  const [header, footer, result, dieResult] = await Promise.all([
    getBlock(server.header),
    getBlock(server.footer),
    notion.databases.query({ database_id: server.id }),
    server.die ? notion.databases.query({ database_id: server.die }) : (async ()=>undefined)(),
  ])
  // 将日历数据出现的图片单独储存，方便部署时下载图片
  const image = [...header.image, ...footer.image]
  // 解析日历数据库的每条数据
  const list = result.results.map((item)=>{
    const [itemData, itemImage] = parseData(item, 'data')
    if (itemData.image){ image.push(itemImage) }
    return itemData
  })
  let die = undefined
  // 解析纪念碑数据库的每条数据
  if (dieResult){
    die = dieResult.results.map((item)=>{
      const [itemData, itemImage] = parseData(item, 'die')
      if (itemData.image){ image.push(itemImage) }
      return itemData
    })
  }
  return {
    ...server,
    header: header.data,
    footer: footer.data,
    list,
    image,
    die,
  }
}
// 获取notion的数据列表
const main = async ()=>{
  const list = await loadList()
  const result = await Promise.all(list.map((item)=>loadDatabse(item)))
  return result
}

module.exports = main
