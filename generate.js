
const fs = require('fs')
const fse = require('fs-extra')
const ics = require('ics')
const filename = require('./filename')

const create = (event)=>{
  return new Promise((success, fail)=>{
    ics.createEvents(event, (error, value) => {
      if (error){ fail(error) }
      else{ success(value) }
    })
  })
}
const save = (value, server)=>{
  return new Promise((success, fail)=>{
    fs.writeFile(filename(server), value, (err)=>{
      if (err){ fail(err) }
      else{ success() }
    })
  })
}

const gen = async ([event, server])=>{
  await fse.ensureDir(`${__dirname}/dist`)
  const value = await create(event)
  await save(value, server)
}

module.exports = gen
