'use strict';

const expect = require('chai').expect;

describe('User module', () => {
  describe('"up"', () => {
    it('should export a function', () => {
      expect(User.up).to.be.a('function')
    })
  })
})