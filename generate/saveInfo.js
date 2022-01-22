
const gen = async (serverList)=>{
  const list = serverList.map((serverData)=>({ ...serverData, image: undefined }))
  const info = {
    time: Date.now(),
    list,
  }
  return [
    ['info.json', JSON.stringify(info)],
    ['imageCache.json', JSON.stringify(serverList)],
  ]
}

module.exports = gen
