
const notion = require('./notion')

const loadList = async ()=>{
  const result = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE2
  })
  const database = {}
  result.results.forEach((item)=>{
    const { time, name, type, amount, comment } = item.properties
    let date = new Date(time.date.start)
    const key = `${date.getFullYear()}-${date.getMonth() + 1}`
    let container = database[key]
    if (!container){
      container = database[key] = { list: {}, comment: [] }
    }
    const itemName = name.title[0].plain_text
    const commentText = comment.rich_text.map((v)=>v.plain_text).join('')
    if (type.select.name !== '备注'){
      const key2 = `${time.date.start}-${itemName}`
      if (!container.list[key2]){ container.list[key2] = { name: itemName, time: date, list: {} } }
      container.list[key2].list[type.select.name] = [amount.number, commentText]
    }else{
      container.comment.push([amount.number, commentText])
    }
  })
  Object.keys(database).forEach((key)=>{
    database[key].comment = database[key].comment.sort((a, b)=>a[0]-b[0]).map((v)=>v[1])
    database[key].list = Object.keys(database[key].list).map((key2)=>database[key].list[key2])
  })
  return database
}

module.exports = loadList
