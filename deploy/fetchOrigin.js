
const path = require('path')
const fs = require('fs-extra')
const getRemoteURL = require('./remoteUrl')
const git = require('./git')

// 将当前的分支内容拉取到 oldDir
const main = async (dirname, branch)=>{
  const oldDir = path.join(dirname, './old')
  await fs.ensureDir(oldDir)
  process.chdir(oldDir)
  const remoteURL = getRemoteURL()
  await git(['clone', remoteURL, '-b', branch, '--single-branch', '--depth=1', '.'])
  return oldDir
}

module.exports = main
