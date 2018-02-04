'use strict'

const Lab = require('lab')
const { expect } = require('code')
const Pinger = require('../../utils/pinger')

const lab = exports.lab = Lab.script()

lab.experiment('Pinger tests', () => {
    lab.test('should say pong', () => {
        // when
        const result = Pinger.sayPong()

        // then
        expect(result).to.equal('pong')
    })
})