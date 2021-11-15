
const path = require('path')
const fs = require('fs-extra')
const getRemoteURL = require('./remoteUrl')
const git = require('./git')

const dirname = path.join(__dirname, '../')
const branch = 'gh-pages-test'

const run = async ()=>{
  await fs.ensureDir('./temp')
  await fs.emptyDir('./temp')

  const oldDir = path.join(dirname, './temp/branch-old')
  const newDir = path.join(dirname, './temp/branch-new')
  await fs.ensureDir(oldDir)
  await fs.ensureDir(newDir)

  const remoteURL = getRemoteURL()

  // 将当前的分支内容拉取到 oldDir
  process.chdir(oldDir)
  await git(['clone', remoteURL, '-b', branch, '--single-branch', '--depth=1'])
  await fs.remove(path.join(oldDir, '.git'))

  // 创建一个空的分支到 newDir
  process.chdir(newDir)
  await git(['init'])
  await git(['checkout', '--orphan', branch])

  // 更新内容
  // 将先前的结果拷贝到目标文件夹
  await fs.copy(oldDir, newDir)
  // 更新生成的日历文件
  await fs.copy(path.join(dirname, 'event.ics'), path.join(newDir, 'event.ics'))
  await fs.copy(path.join(dirname, 'event-ch.ics'), path.join(newDir, 'event-ch.ics'))

  // 将 newDir 的内容强制推送到目标分支
  process.chdir(newDir)
  await git(['config', 'user.name', 'GitHub'])
  await git(['config', 'user.email', 'noreply@github.com'])
  await git(['add', '--all', '.'])
  const author = 'github-actions[bot] <41898282+github-actions[bot]@users.noreply.github.com>'
  await git(['commit', '--author', author, '--message', 'Deploy to GitHub pages'])
  await git(['push', '--quiet', '--force', remoteURL, branch])

  // 返回当前目录
  process.chdir(dirname)
}

const main = async ()=>{
  try {
    await run()
  }catch(e){
    throw e
  }
}

main()
