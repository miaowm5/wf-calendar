
const notion = require('./notion')

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

module.exports = getBlock
