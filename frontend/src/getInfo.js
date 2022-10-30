
import { getSort } from "./tagInfo"

const handleItem = (info)=>{
  const today = new Date()
  const event = { ...info }
  const { timeEnd, timeStart } = event

  // 设置用于排序的时间
  event.timeSort = new Date(timeEnd || timeStart)

  // 设置活动状态
  if (event.timeSort - today < 0){
    // 时间已过：已经开始/已经结束
    event.status = timeEnd ? 'end' : 'open'
  }else{
    // 时间未过
    // 存在开始时间
    if (timeStart){
      // 开始时间已过：等待结束
      if (new Date(timeStart) - today < 0){
        event.status = 'progress'
      }else{
        // 开始时间未过：等待开始
        event.status = 'before'
        event.timeSort = new Date(timeStart)
      }
    }else{
      // 不存在开始时间：等待结束
      event.status = 'progress'
    }
  }

  // 对于还未开始/结束的活动，计算剩余时间
  if (['progress', 'before'].includes(event.status)){
    event.remain = (event.timeSort - today) / 1000
  }
  return event
}

const getTomorrowRemain = ()=>{
  let tomorrow = new Date()
  tomorrow = new Date(tomorrow.setDate(tomorrow.getDate() + 1))
  tomorrow = new Date(
    `${tomorrow.getFullYear()}-${tomorrow.getMonth() + 1}-${tomorrow.getDate()} UTC+0800`
  )
  return (tomorrow - new Date()) / 1000
}

const handleServer = (info)=>{
  const server = { ...info, forecast: false }
  server.list = server.list
    .map((info)=>handleItem(info))
    .sort((a, b)=>{
      let sort = a.timeSort - b.timeSort
      if (sort !== 0){ return sort }
      const statusSort = { 'end': 0, 'open': 1, 'before': 2, 'progress': 3 }
      sort = (statusSort[b.status] || 0) - (statusSort[a.status] || 0)
      if (sort !== 0){ return sort }
      return (getSort(b.tag) || 0) - (getSort(a.tag) || 0)
    })
  // 活动分组:
  // 0-已开始结束, 1-今天内, 2-24小时内, 3-7天内, 4-30天内, 5-更远
  const tomorrow = getTomorrowRemain()
  server.group = [[],[],[],[],[],[]]
  server.list.forEach((info)=>{
    if (info.tag === '千里眼'){ server.forecast = true }
    let index = 0
    if (info.status === 'end' || info.status === 'open'){ index = 0 }
    else if (info.remain < tomorrow){ index = 1 }
    else if (info.remain < 86400){ index = 2 }
    else if (info.remain < 86400 * 7){ index = 3 }
    else if (info.remain < 86400 * 30){ index = 4 }
    else{ index = 5 }
    server.group[index].push(info)
  })
  return server
}

const handleData = (text)=>{
  const result = JSON.parse(text)
  result.list = result.list.map((info)=>handleServer(info))
  return result
}

const getInfo = async ()=>{
  const res = await fetch(`/data/info.json`)
  const text = await res.text()
  if (res.ok){
    return handleData(text)
  }else{
    console.error(text)
    throw new Error(text)
  }
}

export default getInfo
