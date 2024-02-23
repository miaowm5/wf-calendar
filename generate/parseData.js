
const parseData = (prop)=>{
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
  const image = {}
  if (prop.Image.files && prop.Image.files.length > 0){
    let files = prop.Image.files[0]
    image.file = files.file.url
    image.format = files.name.split(".")[1]
  }
  return {
    title, tag, tag2,
    timeStart: timeStart ? timeStart.getTime() : undefined,
    timeEnd: timeEnd ? timeEnd.getTime() : undefined,
    image,
  }
}

const parseDie = (prop)=>{
  let timeStart = new Date(prop.Time.date.start)
  let title = prop.Name.title.map((text)=>text.plain_text).join("")
  let tag = prop?.Tags?.select?.name
  const image = {}
  if (prop.Banner.files && prop.Banner.files.length > 0){
    let files = prop.Banner.files[0]
    image.file = files.file.url
    image.format = files.name.split(".")[1]
  }
  return {
    title, tag,
    time: timeStart.getTime(),
    image,
  }
}

const parse = (item, type='data')=>{
  const id = item.id
  const edit = (new Date(item.last_edited_time)).getTime()

  let data = {}
  if (type === 'die'){ data = parseDie(item.properties) }
  else{ data = parseData(item.properties) }

  let image = data.image
  data.image = image.format
  if (data.image){ image.id = id }

  return [{ id, edit, ...data, }, image]
}

module.exports = parse
