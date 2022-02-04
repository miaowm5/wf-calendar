
const { Client } = require("@notionhq/client")

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const database = process.env.NOTION_DATABASE

const getBlock = async (id)=>{
  let page = await notion.blocks.retrieve({ block_id: id })
  let edit = new Date(page.last_edited_time)
  if (page.has_children){
    page = await notion.blocks.children.list({ block_id: page.id, page_size: 50 })
  }
  const content = []
  const image = []
  const list = page.object === 'list' ? page.results : [page]
  list.forEach((item)=>{
    let itemEdit = new Date(item.last_edited_time)
    if (itemEdit > edit){ edit = itemEdit }
    if (item.type === "image"){
      let file = item.image.file.url
      let format = file.split("?")[0].split(".")
      format = format[format.length - 1]
      image.push({ file, format, id: item.id })
      content.push({ type: "image", format, id: item.id })
    }
  })
  return {
    image,
    data: { content, edit: edit.getTime() },
  }
}
const loadList = async ()=>{
  const result = await notion.databases.query({
    database_id: database,
    sorts: [{ property: 'sort', direction: 'ascending' }],
  })
  const list = await Promise.all(result.results.map((item)=>{
    return (async ()=>{
      const {
        id, server, flag,
        notion: url,
        header: headerID,
        footer: footerID
      } = item.properties
      const [header, footer] = await Promise.all([
        getBlock(headerID.rich_text[0].plain_text),
        getBlock(footerID.rich_text[0].plain_text),
      ])
      return {
        header: header.data,
        footer: footer.data,
        server: server.title[0].plain_text,
        id: id.rich_text[0].plain_text,
        notion: url.rich_text[0].plain_text,
        flag: flag.rich_text[0].plain_text,
        image: [
          ...header.image,
          ...footer.image,
        ]
      }
    })()
  }))
  return list
}
const parseData = (item)=>{
  const prop = item.properties
  const timeStart = prop.StartDate.date ? new Date(prop.StartDate.date.start) : null
  const timeEnd = prop.Date.date ? new Date(prop.Date.date.start) : null
  const tag = prop.Tags.select.name
  const title = prop.Name.title.map((text)=>text.plain_text).join("")
  const edit = (new Date(item.last_edited_time)).getTime()
  const image = {}
  if (prop.Image.files && prop.Image.files.length > 0){
    let files = prop.Image.files[0]
    image.id = item.id
    image.file = files.file.url
    image.format = files.name.split(".")[1]
  }
  return [
    {
      title, tag, edit,
      timeStart: timeStart ? timeStart.getTime() : undefined,
      timeEnd: timeEnd ? timeEnd.getTime() : undefined,
      id: item.id,
      image: image.format,
    },
    image
  ]
}
const loadDatabse = async (server)=>{
  const result = await notion.databases.query({ database_id: server.id })
  const image = server.image
  const list = result.results.map((item)=>{
    const [itemData, itemImage] = parseData(item)
    if (itemData.image){ image.push(itemImage) }
    return itemData
  })
  return { ...server, list, image }
}
const main = async ()=>{
  const list = await loadList()
  const result = await Promise.all(list.map((item)=>loadDatabse(item)))
  return result
}

module.exports = main
