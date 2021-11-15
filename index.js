
require('dotenv').config()
const fs = require('fs-extra')
const getData = require('./getData')
const parseData = require('./parseData')
const generate = require('./generate')

const main = async ()=>{
  await fs.ensureDir('./dist')
  await fs.emptyDir('./dist')
  const list = await getData()
  const eventList = list.map(([data, name])=>{
    const event = data.reduce((r, item)=>r.concat(parseData(item, name)), [])
    return [event, name]
  })
  await Promise.all(eventList.map((item)=>generate(item)))
}

main().then(()=>{
  console.log('done')
}).catch((e)=>{
  console.error(e)
  throw e
})
