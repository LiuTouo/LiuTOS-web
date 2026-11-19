import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync, rmSync, cpSync } from 'node:fs'
import { resolve } from 'node:path'

const run = (cmd, cwd) => execSync(cmd, { cwd, stdio: 'inherit' })
const capture = (cmd, cwd) => execSync(cmd, { cwd, encoding: 'utf8' }).trim()
const root = process.cwd()
const out = resolve(root, 'dist')
const stage = resolve(root, '.deploy')
const remote = capture('git remote get-url origin', root)

run('npm run build', root)
if (!existsSync(out)) throw new Error('dist not found')

rmSync(stage, { recursive: true, force: true })
mkdirSync(stage)
cpSync(out, stage, { recursive: true })
writeFileSync(resolve(stage, '.nojekyll'), '')

run('git init -q', stage)
run('git checkout -q -b gh-pages', stage)
run(`git remote add origin ${remote}`, stage)
run('git add -A', stage)
run(
  'git -c user.name="LiuT 流特" -c user.email="126668869+LiuTouo@users.noreply.github.com" commit -q -m "deploy"',
  stage
)
run('git push -f origin gh-pages', stage)
rmSync(stage, { recursive: true, force: true })
console.log('deployed to gh-pages')
