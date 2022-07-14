
const tagList = {
  活动: 'rgba(236, 0, 4, .7)',
  限定卡池: 'rgba(0, 161, 253, .7)',
  卡池: 'rgba(0, 161, 253, .7)',
  兑换: 'rgba(0, 161, 253, .7)',
  体力药过期: 'rgba(126, 3, 186, .7)',
  定期重置: 'rgba(126, 3, 186, .7)',
  贩售: 'rgba(249, 200, 0, .7)',
  运营活动: 'rgba(126, 3, 186, .7)',
  停服维护: 'rgba(126, 3, 186, .7)',
  版本更新: 'rgba(126, 3, 186, .7)',
  千里眼: 'rgba(249, 200, 0, .7)',
}

const sortList = Object.keys(tagList).reverse()
sortList.forEach((key)=>{
  tagList[key] = [tagList[key], sortList.indexOf(key)]
})
const getColor = (tag)=>(tagList[tag] || tagList[sortList[0]])[0]
const getSort = (tag)=>(tagList[tag] || tagList[sortList[0]])[1]

export { getColor, getSort }
