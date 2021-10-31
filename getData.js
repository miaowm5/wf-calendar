
const { Client } = require("@notionhq/client")

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const database = process.env.NOTION_DATABASE

const loadList = async ()=>{
  const list = await notion.blocks.children.list({ block_id: database })
  return list.results.reduce((arr, item)=>{
    if(item.type !== "child_database"){ return arr }
    return [...arr, [item.id, item.child_database.title]]
  }, [])
}
const loadDatabse = async (item)=>{
  const result = await notion.databases.query({ database_id: item[0] })
  return [result.results, item[1]]
}
const main = async ()=>{
  const list = await loadList()
  const result = []
  await Promise.all(list.map((item)=>{
    return (async ()=>{
      const database = await loadDatabse(item)
      result.push(database)
    })()
  }))
  return result
}

module.exports = main
