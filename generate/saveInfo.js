
// 生成供发布使用的数据
const gen = async (serverList)=>{
  const list = serverList.map((serverData)=>({ ...serverData, image: undefined }))
  const info = {
    time: Date.now(),
    list,
  }
  return [
    // 前端实际使用的数据，记录了数据生成时间
    ['data/info.json', JSON.stringify(info)],
    // 部署时使用的数据，保留了图片资源的地址供页面部署时下载原图
    ['deploy/info.json', JSON.stringify(serverList)],
  ]
}

module.exports = gen
