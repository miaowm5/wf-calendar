
require('dotenv').config()
const fs = require('fs-extra')
const path = require('path')
const getData = require('./getData')
const generate = require('./generate')
const saveInfo = require('./saveInfo')

const dist = path.join(__dirname, '../dist/generate')

const main = async ()=>{
  await fs.ensureDir(dist)
  await fs.emptyDir(dist)
  const list = await getData()
  let fileList = await Promise.all([
    Promise.all(list.map((item)=>generate(item))),
    saveInfo(list)
  ])
  await Promise.all(fileList.flat().map(([file, value])=>{
    return fs.outputFile(path.join(dist, file), value)
  }))
}

main().then(()=>{
  console.log('done')
}).catch((e)=>{
  console.error(e)
  throw e
})
