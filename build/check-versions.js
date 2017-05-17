/**
 * 如名字所说，用来判断当前node， npm的版本是否符合条件
 * 
 */

var chalk = require('chalk')  // Terminal string styling 美化终端提示 https://github.com/chalk/chalk
var semver = require('semver') // 版本控制 https://github.com/npm/node-semver
var packageConfig = require('../package.json')
var shell = require('shelljs') // 终端命令 https://github.com/shelljs/shelljs
function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()  // 同步新建子进程
}

var versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  },
]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),  // 获取当前npm版本
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {
  var warnings = []
  for (var i = 0; i < versionRequirements.length; i++) { // 判断当前npm，node是否符合配置
    var mod = versionRequirements[i]
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()
    for (var i = 0; i < warnings.length; i++) {
      var warning = warnings[i]
      console.log('  ' + warning)
    }
    console.log()
    process.exit(1)
  }
}
