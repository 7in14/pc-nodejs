'use strict'

const Lab = require('lab')
const { expect } = require('code')
const Reader = require('../../utils/jsonReader')

const lab = exports.lab = Lab.script()

lab.experiment('Reader tests', () => {
    lab.test('should read a file', () => {
        // when
        const result = Reader.read("./testData/sampleFile.txt")

        // then
        expect(result).to.not.be.empty()
    })
})