
const ics = require('ics')
const { get: serverFlag } = require('../common/serverFlag')

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

const create = (list, server)=>{
  const event = []
  list.forEach(({title, tag, timeStart, timeEnd})=>{
    if (timeStart && timeEnd){
      event.push(genReminder(`[${tag}开始]${title}`, timeStart, server))
      event.push(genReminder(`[${tag}结束]${title}`, timeEnd, server))
    }else{
      if (timeStart){ event.push(genReminder(`[${tag}]${title}`, timeStart, server)) }
      if (timeEnd){ event.push(genReminder(`[${tag}]${title}`, timeEnd, server)) }
    }
  })
  return new Promise((success, fail)=>{
    ics.createEvents(event, (error, value) => {
      if (error){ fail(error) }
      else{ success(value) }
    })
  })
}

const gen = async ({list, server})=>{
  const value = await create(list, server)
  return [`event-${serverFlag(server)}.ics`, value]
}

module.exports = gen
