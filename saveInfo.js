
const save = require('./save')

const gen = async (serverList)=>{
  const list = serverList.map((serverData)=>({ ...serverData, image: undefined }))
  const info = {
    time: Date.now(),
    list,
  }
  await save(JSON.stringify(info), `${__dirname}/dist/info.json`)
  await save(JSON.stringify(serverList), `${__dirname}/dist/imageCache.json`)
}

module.exports = gen
