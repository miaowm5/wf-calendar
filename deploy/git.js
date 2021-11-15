const exec = require('@actions/exec')

const run = async (command, args)=>{
  let stdout = ''
  let stderr = ''
  const returnCode = await exec.exec(command, args, {
    silent: true,
    ignoreReturnCode: true,
    listeners: {
      stdout: (data)=>{ stdout += data.toString() },
      stderr: (data)=>{ stderr += data.toString() }
    }
  })
  return {
    success: returnCode === 0,
    stdout: stdout.trim(),
    stderr: stderr.trim()
  }
}

const git = async (args)=>{
  const res = await run(`git`, args)
  if (res.stderr != '' && !res.success){ throw new Error(res.stderr) }
  return res.stdout.trim()
}

module.exports = git
