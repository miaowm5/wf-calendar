
const fs = require('fs-extra')

const gen = async (serverList)=>{
  const list = serverList.map((serverData)=>({ ...serverData, image: undefined }))
  const info = {
    time: Date.now(),
    list,
  }
  await fs.writeFile(`${__dirname}/dist/info.json`, JSON.stringify(info))
  await fs.writeFile(`${__dirname}/dist/imageCache.json`, JSON.stringify(serverList))
}

module.exports = gen
