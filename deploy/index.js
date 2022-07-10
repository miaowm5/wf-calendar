
require('dotenv').config()
const path = require('path')
const fs = require('fs-extra')
const getRemoteURL = require('./remoteUrl')
const git = require('./git')
const checkUpdate = require('./checkUpdate')
const updateImage = require('./updateImage')
const cloudflare = require('./cloudflare')
const fetchOrigin = require('./fetchOrigin')
const createNew = require('./createNew')

const dirname = path.join(__dirname, '../dist')
const branch = 'build'

// 更新内容
const update = async (newDir)=>{

  // 更新前端数据
  if (process.env.DEPLOY_TYPE === 'FRONTEND'){
    const genDir = path.join(dirname, './frontend')
    await Promise.all([
      fs.remove(path.join(newDir, 'assets')),
      fs.remove(path.join(newDir, 'front-assets')),
    ])
    await Promise.all([
      fs.copy(path.join(genDir, 'index.html'), path.join(newDir, 'index.html')),
      fs.copy(path.join(genDir, '_headers'), path.join(newDir, '_headers')),
      fs.copy(path.join(genDir, 'assets'), path.join(newDir, 'assets')),
      fs.copy(path.join(genDir, 'front-assets'), path.join(newDir, 'front-assets')),
    ])
    return true
  }

  // （默认）更新日历数据
  const genDir = path.join(dirname, './generate')
  const updateInfo = await checkUpdate(genDir, newDir)

  if (!updateInfo.update && process.env.DEPLOY_FORCE_UPDATE !== 'true'){
    console.log('Everything up to date')
    return false
  }

  await fs.remove(path.join(newDir, 'data'))
  await Promise.all([
    // 更新日历
    fs.copy(path.join(genDir, 'event-jp.ics'), path.join(newDir, 'event.ics')),
    fs.copy(path.join(genDir, 'event-jp.ics'), path.join(newDir, 'event-jp.ics')),
    fs.copy(path.join(genDir, 'event-ch.ics'), path.join(newDir, 'event-ch.ics')),
    // 更新数据
    fs.copy(path.join(genDir, 'data'), path.join(newDir, 'data')),
    // 更新图片
    updateImage(updateInfo, genDir, newDir)
  ])
  return true
}

const main = async ()=>{
  const deployDir = path.join(dirname, './deploy')
  await fs.emptyDir(deployDir)
  const oldDir = await fetchOrigin(deployDir, branch)
  const newDir = await createNew(deployDir, branch)

  // 将上一次的提交结果拷贝到 newDir
  await fs.copy(oldDir, newDir)

  // 根据本次的生成结果更新 newDir
  const needUpdate = await update(newDir)
  if (!needUpdate){ return }

  // 将 newDir 的内容强制推送到目标分支
  process.chdir(newDir)
  await git(['config', 'user.name', 'GitHub'])
  await git(['config', 'user.email', 'noreply@github.com'])
  await git(['add', '--all', '.'])
  const author = 'github-actions[bot] <41898282+github-actions[bot]@users.noreply.github.com>'
  await git(['commit', '--author', author, '--message', 'Deploy to GitHub pages'])
  await git(['push', '--quiet', '--force', getRemoteURL(), branch])

  // 调用 Cloudflare API 更新页面
  await cloudflare()
}

main().then(()=>{
  console.log('done')
}).catch((e)=>{
  console.error(e)
  throw e
})
