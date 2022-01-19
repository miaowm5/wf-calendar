
const info = {
  '日服': 'jp',
  '国服': 'ch',
  '台服': 'tw',
  '国际服': 'g',
}

const get = (server)=>{
  if (!info[server]){ throw new Error(`Server Config Not Exist: ${server}`) }
  return info[server]
}

module.exports = { get, info }
