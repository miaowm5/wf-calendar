
const fs = require('fs')

const save = (value, filename)=>{
  return new Promise((success, fail)=>{
    fs.writeFile(filename, value, (err)=>{
      if (err){ fail(err) }
      else{ success() }
    })
  })
}

module.exports = save
