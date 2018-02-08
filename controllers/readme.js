'use strict'

const JsonReader = require('./../utils/jsonReader')

exports.get = { 
    async handler(request, h) {
        const json = await JsonReader.read('./README.md')
        return json
    }
}