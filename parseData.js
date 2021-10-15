
const parse = (item)=>{
  const prop = item.properties

  const time = new Date(prop.Date.date.start)
  let server = '日服'
  const tag = prop.Tags.select.name
  let title = `[${tag}]${prop.Name.title[0].plain_text}`
  let description = `弹射世界${server}日程提醒：\n${title}`
  let alarm = false

  const timeDate = [
    time.getUTCFullYear(),
    time.getUTCMonth() + 1,
    time.getUTCDate(),
    time.getUTCHours(),
    time.getUTCMinutes()
  ]

  if (tag === '活动结束'){ alarm = true }

  const result = {
    startInputType: 'utc',
    start: timeDate,
    end: timeDate,
    title,
    description,
  }

  if (alarm){
    result.alarms = [{action: 'display', description: 'Reminder', trigger: { hours: 6, minutes: 0, before: true }}]
  }

  return result
}

module.exports = parse
