'use strict'

const fs = require('fs') 

const jsonReader = {
    read(path) {
        let file = fs.readFileSync(path).toString()
        let json = {
            data: file
        }

        return json
    }
};

module.exports = jsonReader