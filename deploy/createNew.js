
const path = require('path')
const fs = require('fs-extra')
const git = require('./git')

// 创建一个空的分支到 newDir
const main = async (dirname, branch)=>{
  const newDir = path.join(dirname, './new')
  await fs.ensureDir(newDir)
  process.chdir(newDir)
  await git(['init'])
  await git(['checkout', '--orphan', branch])
  return newDir
}

module.exports = main
