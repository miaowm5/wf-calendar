
const fs = require('fs')
const ics = require('ics')

const create = (event)=>{
  return new Promise((success, fail)=>{
    ics.createEvents(event, (error, value) => {
      if (error){ fail(error) }
      else{ success(value) }
    })
  })
}
const save = (value, filename = `${__dirname}/event.ics`)=>{
  return new Promise((success, fail)=>{
    fs.writeFile(filename, value, (err)=>{
      if (err){ fail(err) }
      else{ success() }
    })
  })
}

const gen = async (event)=>{
  const value = await create(event)
  await save(value)
}

module.exports = gen
