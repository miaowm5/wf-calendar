
const notion = require('./notion')

const loadList = async ()=>{
  const result = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE,
    sorts: [{ property: 'sort', direction: 'ascending' }],
  })
  const list = await Promise.all(result.results.map((item)=>{
    return (async ()=>{
      const {
        id, server, flag, header, footer,
        notion: url,
      } = item.properties
      return {
        header: header.rich_text[0].plain_text,
        footer: footer.rich_text[0].plain_text,
        server: server.title[0].plain_text,
        id: id.rich_text[0].plain_text,
        notion: url.rich_text[0].plain_text,
        flag: flag.rich_text[0].plain_text,
      }
    })()
  }))
  return list
}

module.exports = loadList
