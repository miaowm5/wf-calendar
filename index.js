
require('dotenv').config()
const fs = require('fs-extra')
const getData = require('./getData')
const parseData = require('./parseData')
const generate = require('./generate')

const main = async ()=>{
  await fs.ensureDir('./dist')
  await fs.emptyDir('./dist')
  let list = await getData()
  list = list.map((item)=>{
    const event = item.list.reduce((r, item)=>r.concat(parseData(item, item.server)), [])
    return { ...item, event }
  })
  await Promise.all(list.map((item)=>generate(item)))
}

main().then(()=>{
  console.log('done')
}).catch((e)=>{
  console.error(e)
  throw e
})
