
const save = require('./save')

const gen = async (list)=>{
  const info = {
    time: Date.now(),
    list,
  }
  await save(JSON.stringify(info), `${__dirname}/dist/info.json`)
}

module.exports = gen
