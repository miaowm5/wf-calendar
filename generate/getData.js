
const notion = require('./notion')
const loadList = require('./getList')
const getBlock = require('./getBlock')

const parseData = (item)=>{
  const prop = item.properties
  const timeStart = prop.StartDate.date ? new Date(prop.StartDate.date.start) : null
  const timeEnd = prop.Date.date ? new Date(prop.Date.date.start) : null
  const tag = prop.Tags.select.name
  const tag2 = prop?.Tag2?.select?.name
  const title = prop.Name.title.map((text)=>text.plain_text).join("")
  const edit = (new Date(item.last_edited_time)).getTime()
  const image = {}
  if (prop.Image.files && prop.Image.files.length > 0){
    let files = prop.Image.files[0]
    image.id = item.id
    image.file = files.file.url
    image.format = files.name.split(".")[1]
  }
  return [
    {
      title, tag, tag2, edit,
      timeStart: timeStart ? timeStart.getTime() : undefined,
      timeEnd: timeEnd ? timeEnd.getTime() : undefined,
      id: item.id,
      image: image.format,
    },
    image
  ]
}
const loadDatabse = async (server)=>{
  const [header, footer, result] = await Promise.all([
    getBlock(server.header),
    getBlock(server.footer),
    notion.databases.query({ database_id: server.id }),
  ])
  const image = [...header.image, ...footer.image]
  const list = result.results.map((item)=>{
    const [itemData, itemImage] = parseData(item)
    if (itemData.image){ image.push(itemImage) }
    return itemData
  })
  return {
    ...server,
    header: header.data,
    footer: footer.data,
    list,
    image
  }
}
// 获取notion的数据列表
const main = async ()=>{
  const list = await loadList()
  const result = await Promise.all(list.map((item)=>loadDatabse(item)))
  return result
}

module.exports = main
