
const axios = require('axios').default

const database = process.env.NOTION_DATABASE
const token = process.env.NOTION_TOKEN
const version = '2021-08-16'
const url = `https://api.notion.com/v1/databases/${database}/query`

const main = async ()=>{
  try{
    const response = await axios({
      url, method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Notion-Version': version },
    })
    return response.data.results
  }catch(error){
    console.error(error)
    return null
  }
}

module.exports = main
