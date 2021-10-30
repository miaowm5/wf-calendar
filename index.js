
require('dotenv').config()
const getData = require('./getData')
const parseData = require('./parseData')
const generate = require('./generate')

const main = async ()=>{
  const list = await getData()
  if (!list){ return }
  const event = list.reduce((r, item)=>r.concat(parseData(item)), [])
  await generate(event)
}

main()
