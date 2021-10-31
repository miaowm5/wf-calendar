
const main = (server)=>{
  if (server === '日服'){ return `${__dirname}/event.ics` }
  if (server === '国服'){ return `${__dirname}/event-ch.ics` }
  if (server === '台服'){ return `${__dirname}/event-tw.ics` }
  if (server === '国际服'){ return `${__dirname}/event-g.ics` }
  throw new Error(`Server Config Not Exist: ${server}`)
}

module.exports = main
