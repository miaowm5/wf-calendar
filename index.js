
require('dotenv').config()
const fs = require('fs-extra')
const getData = require('./getData')
const generate = require('./generate')
const saveInfo = require('./saveInfo')

const main = async ()=>{
  await fs.ensureDir('./dist')
  await fs.emptyDir('./dist')
  const list = await getData()
  await Promise.all(list.map((item)=>generate(item)))
  await saveInfo(list)
}

main().then(()=>{
  console.log('done')
}).catch((e)=>{
  console.error(e)
  throw e
})
