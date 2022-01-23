
import { writable } from 'svelte/store'

// if(dateBetween(prop("DateSort"), now(), "days") == 0, format(dateBetween(prop("DateSort"), now(), "hours")) + "小时", format(dateBetween(prop("DateSort"), now(), "days")) + "天")

const handeItem = (info)=>{
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

function createStore() {
  const { subscribe, set } = writable({})
  return {
    subscribe,
    set: (data)=>{
      const result = { ...data }
      result.list = result.list.map((serverInfo)=>{
        const server = { ...serverInfo }
        server.list = server.list
          .map((eventInfo)=>handeItem(eventInfo))
          .sort((a, b)=>{
            const sort = a.timeSort - b.timeSort
            if (sort !== 0){ return sort }
            const statusSort = { 'end': 0, 'open': 1, 'before': 2, 'progress': 3 }
            return (statusSort[a.status] || 0) - (statusSort[b.status] || 0)
          })
        return server
      })
      set(result)
    },
  }
}

const data = createStore()
export default data
