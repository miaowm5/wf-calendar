
const fs = require('fs-extra')

const gen = async (serverList)=>{
  const list = serverList.map((serverData)=>({ ...serverData, image: undefined }))
  const info = {
    time: Date.now(),
    list,
  }
  await fs.writeFile(`./dist/info.json`, JSON.stringify(info))
  await fs.writeFile(`./dist/imageCache.json`, JSON.stringify(serverList))
}

module.exports = gen
