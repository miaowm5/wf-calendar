
const getAlarmTime = (time)=>{
  let hours = time.getUTCHours() + 8
  if (hours > 24){ hours -= 24 }
  if (hours <= 12){
    return hours + 4
  }else{
    return hours - 8
  }
}

const parse = (item)=>{
  const prop = item.properties

  const time = new Date(prop.Date.date.start)
  let server = '日服'
  const tag = prop.Tags.select.name
  let title = `[${tag}]${prop.Name.title[0].plain_text}`
  let description = `弹射世界${server}日程提醒：\n${title}`

  const timeDate = [
    time.getUTCFullYear(),
    time.getUTCMonth() + 1,
    time.getUTCDate(),
    time.getUTCHours(),
    time.getUTCMinutes()
  ]

  const result = {
    startInputType: 'utc',
    start: timeDate,
    end: timeDate,
    title,
    description,
    alarms: [
      {
        action: 'display',
        description: 'Reminder',
        trigger: { hours: getAlarmTime(time), minutes: 0, before: true }
      }
    ]
  }
  return result
}

module.exports = parse
