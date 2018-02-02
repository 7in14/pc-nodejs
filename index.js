const Chalk = require('chalk')

function hello() {
    console.log(Chalk.blue(`Hello node!\nVersion: ${process.version}`))
}

hello()