
const { Client } = require("@notionhq/client")

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const database = process.env.NOTION_DATABASE

const main = async ()=>{
  const result = await notion.databases.query({ database_id: database })
  return result.results
}

module.exports = main
