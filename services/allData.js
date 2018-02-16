'use strict'

const Request = require('async-request')

const DataSources = require('../repositories/dataSource')

const service = {
    async getAllData() {

        var page = 1
        var sources = await DataSources.get()
        var result = []

        try {

            while(sources.dataSources.length > 0) {

                for(var i = 0; i < sources.dataSources.length; i++) {
                    const dataSource = sources.dataSources[i]
                    const response = await Request(dataSource.url)

                    result.push({ url: dataSource.url, data: response.body })
                }

                page++
                sources = await DataSources.get(page)
            }
        }
        catch (err) {
            return { error: err }
        }

        return result
    }
}

module.exports = service