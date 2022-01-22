
const gen = async (serverList)=>{
  const list = serverList.map((serverData)=>({ ...serverData, image: undefined }))
  const info = {
    time: Date.now(),
    list,
  }
  return [
    ['data/info.json', JSON.stringify(info)],
    ['deploy/info.json', JSON.stringify(serverList)],
  ]
}

module.exports = gen
