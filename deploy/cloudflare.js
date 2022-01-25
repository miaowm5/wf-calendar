const https = require('https')

const main = async ()=>{
  const options = {
    hostname: 'api.cloudflare.com',
    port: 443,
    path: `/client/v4/pages/webhooks/deploy_hooks/${process.env.CLOUDFLARE_WEBHOOK}`,
    method: 'POST',
  }
  const result = await new Promise((success, fail)=>{
    const req = https.request(options, (res)=>{
      res.on('data', (d)=>success(d))
    })
    req.on('error', (error)=>{ fail(error) })
    req.end()
  })
  console.log(result.toString())
}

module.exports = main
