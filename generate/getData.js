
const notion = require('./notion')
const loadList = require('./getList')
const getBlock = require('./getBlock')

const parseData = (item)=>{
  const prop = item.properties
  let time1 = prop.StartDate.date ? new Date(prop.StartDate.date.start) : null
  let time2 = prop.Date.date ? new Date(prop.Date.date.start) : null
  // 结束时间小于开始时间的，清空结束时间
  if (time1 && time2 && (time1 - time2 > 0)){ time2 = null }
  const tag = prop.Tags.select.name
  let [timeStart, timeEnd] = [time1, time2]
  // 定期重置/体力药过期，只保留结束时间
  if (['定期重置', '体力药过期'].includes(tag)){ [timeStart, timeEnd] = [null, time2 || time1] }
  // 版本更新，只保留开始时间
  if (tag === '版本更新'){ [timeStart, timeEnd] = [time1 || time2, null] }
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
