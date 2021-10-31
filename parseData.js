
const getAlarmTime = (time)=>{
  let hours = time.getUTCHours() + 8
  if (hours > 24){ hours -= 24 }
  if (hours <= 12){
    return hours + 4
  }else{
    return hours - 8
  }
}

const genReminder = (title, time, server)=>{
  const timeDate = [
    time.getUTCFullYear(),
    time.getUTCMonth() + 1,
    time.getUTCDate(),
    time.getUTCHours(),
    time.getUTCMinutes()
  ]

  return {
    startInputType: 'utc',
    start: timeDate,
    end: timeDate,
    title,
    description: `弹射世界${server}：\n${title}\nhttps://wf-calendar.miaowm5.com/`,
    alarms: [
      {
        action: 'display',
        description: 'Reminder',
        trigger: { hours: getAlarmTime(time), minutes: 0, before: true }
      }
    ]
  }
}

const parse = (item, server)=>{
  const prop = item.properties
  const timeStart = prop.StartDate.date ? new Date(prop.StartDate.date.start) : null
  const timeEnd = prop.Date.date ? new Date(prop.Date.date.start) : null
  const tag = prop.Tags.select.name
  const title = prop.Name.title[0].plain_text
  const result = []
  if (timeStart && timeEnd){
    result.push(genReminder(`[${tag}开始]${title}`, timeStart, server))
    result.push(genReminder(`[${tag}结束]${title}`, timeEnd, server))
  }else{
    if (timeStart){ result.push(genReminder(`[${tag}]${title}`, timeStart, server)) }
    if (timeEnd){ result.push(genReminder(`[${tag}]${title}`, timeEnd, server)) }
  }
  return result
}

module.exports = parse
