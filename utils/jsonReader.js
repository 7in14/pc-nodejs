'use strict'

const fs = require('await-fs') 

const jsonReader = {
    async read(path) {
        const content = await fs.readFile(path)
        const json = {
            data: content.toString()
        }
        return json
    }
};

module.exports = jsonReader