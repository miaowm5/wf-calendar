
const { Client } = require("@notionhq/client")

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const database = process.env.NOTION_DATABASE

const loadList = async ()=>{
  const result = await notion.databases.query({ database_id: database })
  return result.results.map((item)=>{
    const {id, server, notion} = item.properties
    return {
      server: server.title[0].plain_text,
      id: id.rich_text[0].plain_text,
      notion: notion.rich_text[0].plain_text,
    }
  })
}
const parseData = (item)=>{
  const prop = item.properties
  const timeStart = prop.StartDate.date ? new Date(prop.StartDate.date.start) : null
  const timeEnd = prop.Date.date ? new Date(prop.Date.date.start) : null
  const tag = prop.Tags.select.name
  const title = prop.Name.title[0].plain_text
  return { title, tag, timeStart, timeEnd }
}
const loadDatabse = async (item)=>{
  const result = await notion.databases.query({ database_id: item.id })
  return { ...item, list: result.results.map((item)=>parseData(item)) }
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
