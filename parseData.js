
const parse = (item)=>{
  const prop = item.properties

  const time = new Date(prop.Date.date.start)
  const title = prop.Name.title[0].plain_text
  const tag = prop.Tags.multi_select.map((tag)=>tag.name)

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
    description: title,
  }

  if (tag.includes('结束')){
    result.alarms = [{action: 'display', description: 'Reminder', trigger: { hours: 6, minutes: 0, before: true }}]
  }

  return result
}

module.exports = parse
