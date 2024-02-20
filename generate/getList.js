
const notion = require('./notion')

const loadList = async ()=>{
  const result = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE,
    sorts: [{ property: 'sort', direction: 'ascending' }],
  })
  return result.results.map((item)=>{
    const {
      id, server, flag, header, footer, die,
      notion: url,
    } = item.properties
    const getValue = (v)=>v?.rich_text?.[0]?.plain_text
    return {
      header: getValue(header),
      footer: getValue(footer),
      id:     getValue(id),
      notion: getValue(url),
      flag:   getValue(flag),
      die:    getValue(die),
      server: server.title[0].plain_text,
    }
  })
}

module.exports = loadList
