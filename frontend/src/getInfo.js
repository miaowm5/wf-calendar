
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

const handleServer = (info)=>{
  const server = { ...info }
  server.list = server.list
    .map((info)=>handleItem(info))
    .sort((a, b)=>{
      const sort = a.timeSort - b.timeSort
      if (sort !== 0){ return sort }
      const statusSort = { 'end': 0, 'open': 1, 'before': 2, 'progress': 3 }
      return (statusSort[b.status] || 0) - (statusSort[a.status] || 0)
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
