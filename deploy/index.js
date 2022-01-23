
require('dotenv').config()
const path = require('path')
const fs = require('fs-extra')
const getRemoteURL = require('./remoteUrl')
const git = require('./git')
const updateImage = require('./updateImage')

const dirname = path.join(__dirname, '../dist')
const branch = 'build'

// 更新内容
const update = async (newDir)=>{

  // 更新前端数据
  if (process.env.DEPLOY_TYPE === 'FRONTEND'){
    const genDir = path.join(dirname, './frontend')
    await Promise.all([
      fs.copy(path.join(genDir, 'index.html'), path.join(newDir, 'index.html')),
      fs.copy(path.join(genDir, 'assets'), path.join(newDir, 'assets')),
    ])
    return
  }

  // （默认）更新日历数据
  const genDir = path.join(dirname, './generate')
  await Promise.all([
    // 更新日历
    fs.copy(path.join(genDir, 'event-jp.ics'), path.join(newDir, 'event.ics')),
    fs.copy(path.join(genDir, 'event-jp.ics'), path.join(newDir, 'event-jp.ics')),
    fs.copy(path.join(genDir, 'event-ch.ics'), path.join(newDir, 'event-ch.ics')),
    // 更新数据
    fs.copy(path.join(genDir, 'data'), path.join(newDir, 'data')),
    // 更新图片
    updateImage(genDir, newDir)
  ])
}

const main = async ()=>{
  await fs.ensureDir(path.join(dirname, './deploy'))
  await fs.emptyDir(path.join(dirname, './deploy'))

  const oldDir = path.join(dirname, './deploy/old')
  const newDir = path.join(dirname, './deploy/new')
  await fs.ensureDir(oldDir)
  await fs.ensureDir(newDir)

  const remoteURL = getRemoteURL()

  // 将当前的分支内容拉取到 oldDir
  process.chdir(oldDir)
  await git(['clone', remoteURL, '-b', branch, '--single-branch', '--depth=1', '.'])
  await fs.remove(path.join(oldDir, '.git'))

  // 创建一个空的分支到 newDir
  process.chdir(newDir)
  await git(['init'])
  await git(['checkout', '--orphan', branch])

  // 将上一次的提交结果拷贝到 newDir
  await fs.copy(oldDir, newDir)

  // 根据本次的生成结果更新 newDir
  await update(newDir)

  // 将 newDir 的内容强制推送到目标分支
  process.chdir(newDir)
  await git(['config', 'user.name', 'GitHub'])
  await git(['config', 'user.email', 'noreply@github.com'])
  await git(['add', '--all', '.'])
  const author = 'github-actions[bot] <41898282+github-actions[bot]@users.noreply.github.com>'
  await git(['commit', '--author', author, '--message', 'Deploy to GitHub pages'])
  await git(['push', '--quiet', '--force', remoteURL, branch])
}

main().then(()=>{
  console.log('done')
}).catch((e)=>{
  console.error(e)
  throw e
})
