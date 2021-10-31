
require('dotenv').config()
const getData = require('./getData')
const parseData = require('./parseData')
const generate = require('./generate')

const main = async ()=>{
  const list = await getData()
  const eventList = list.map(([data, name])=>{
    const event = data.reduce((r, item)=>r.concat(parseData(item, name)), [])
    return [event, name]
  })
  await Promise.all(eventList.map((item)=>generate(item)))
}

main()
