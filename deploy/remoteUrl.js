
const main = ()=>{
  if (process.env['GITHUB_REPOURL']){ return process.env['GITHUB_REPOURL'] }
  let remoteURL = 'https://'
  remoteURL = remoteURL.concat('x-access-token:', process.env['GITHUB_TOKEN'].trim())
  remoteURL = remoteURL.concat('@github.com/', process.env['GITHUB_REPOSITORY'], '.git')
  return remoteURL
}

module.exports = main
