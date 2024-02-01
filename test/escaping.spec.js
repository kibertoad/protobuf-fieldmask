const { assert } = require('chai')
const { escapeProperty, unescapeAndSplit } = require('../lib/escaping')

describe('Escaping', () => {
  describe('escape', () => {
    it('should return property name as is when it does not contain special characters', () => {
      assert.equal(escapeProperty('foo'), 'foo')
    })

    it('should escape dots in the property name', () => {
      assert.equal(escapeProperty('foo.bar'), 'foo\\.bar')
    })

    it('should escape multiple dots in the property name', () => {
      assert.equal(escapeProperty('foo.bar.baz.'), 'foo\\.bar\\.baz\\.')
    })

    it('should escape the escape char', () => {
      assert.equal(escapeProperty('foo\\bar'), 'foo\\\\bar')
    })

    it('should escape the escape char when containing with dots', () => {
      assert.equal(escapeProperty('foo\\.bar'), 'foo\\\\\\.bar')
    })
  })

  describe('unescapeAndSplit', () => {
    it('should array with single element when path is for a single property', () => {
      assert.deepEqual(unescapeAndSplit('foo'), ['foo'])
    })

    it('should return an array of names split by dot', () => {
      assert.deepEqual(unescapeAndSplit('foo.bar.baz'), ['foo', 'bar', 'baz'])
    })

    it('should unescape escaped dots', () => {
      assert.deepEqual(unescapeAndSplit('foo\\.bar'), ['foo.bar'])
    })

    it('should return an array of names split by dot with respect to escaped dots', () => {
      assert.deepEqual(unescapeAndSplit('foo\\.bar\\.baz.baf'), ['foo.bar.baz', 'baf'])
    })

    it('should handle trailing escaped dot correctly', () => {
      assert.deepEqual(unescapeAndSplit('foo\\..baz'), ['foo.', 'baz'])
    })

    it('should handle escape char correctly', () => {
      assert.deepEqual(unescapeAndSplit('foo\\\\.baz'), ['foo\\', 'baz'])
    })

    it('should handle escape char with dot correctly', () => {
      assert.deepEqual(unescapeAndSplit('foo\\\\\\..baz'), ['foo\\.', 'baz'])
    })

    it('should play well with escape function results', () => {
      assert.deepEqual(unescapeAndSplit(escapeProperty('foo\\.bar')), ['foo\\.bar'])
    })
  })
})
