import { getData } from './get-data';
import { assert } from 'chai';

describe('Testing "./tool/arg/util/get-data"', () => {
  describe(`Test [ '-param0', '-param1' ]`, () => {
    const data = getData([ '-param0', '-param1' ])
    it('#isObject()', () => {
      assert.isObject(data)
    })
    it(`#containsAllKeys([ 'param0', 'param1' ])`, () => {
      assert.containsAllKeys(data, [ 'param0', 'param1' ])
    })
    it(`#isArray(data[ 'param0' ])`, () => {
      assert.isArray(data.param0)
    })
    it(`#isArray(data[ 'param1' ])`, () => {
      assert.isArray(data.param1)
    })
  })

  describe(`Test [ '--param0', '--param1' ]`, () => {
    const data = getData([ '--param0', '--param1' ])
    it('#isObject()', () => {
      assert.isObject(data)
    })
    it(`#containsAllKeys([ 'param0', 'param1' ])`, () => {
      assert.containsAllKeys(data, [ 'param0', 'param1' ])
    })
    it(`#isArray(data[ 'param0' ])`, () => {
      assert.isArray(data.param0)
    })
    it(`#isArray(data[ 'param1' ])`, () => {
      assert.isArray(data.param1)
    })
  })

  describe(`Test [ '-param-0', '-param-1' ]`, () => {
    const data = getData([ '-param-0', '-param-1' ])
    it('#isObject()', () => {
      assert.isObject(data)
    })
    it(`#containsAllKeys([ 'param-0', 'param-1' ])`, () => {
      assert.containsAllKeys(data, [ 'param-0', 'param-1' ])
    })
    it(`#isArray(data[ 'param-0' ])`, () => {
      assert.isArray(data['param-0'])
    })
    it(`#isArray(data[ 'param-1' ])`, () => {
      assert.isArray(data['param-1'])
    })
  })

  describe(`Test [ '--param-0', '--param-1' ]`, () => {
    const data = getData([ '--param-0', '--param-1' ])
    it('#isObject()', () => {
      assert.isObject(data)
    })
    it(`#containsAllKeys([ 'param-0', 'param-1' ])`, () => {
      assert.containsAllKeys(data, [ 'param-0', 'param-1' ])
    })
    it(`#isArray(data[ 'param-0' ])`, () => {
      assert.isArray(data['param-0'])
    })
    it(`#isArray(data[ 'param-1' ])`, () => {
      assert.isArray(data['param-1'])
    })
  })

  describe(`Test [ '--param-0', 'value-0', 'value-1', '--param-1', 'value-0', 'value-1' ]`, () => {
    const data = getData([ '--param-0', 'value-0', 'value-1', '--param-1', 'value-0', 'value-1' ])
    it('#isObject()', () => {
      assert.isObject(data)
    })
    it(`#containsAllKeys([ 'param-0', 'param-1' ])`, () => {
      assert.containsAllKeys(data, [ 'param-0', 'param-1' ])
    })
    it(`#isArray(data[ 'param-0' ])`, () => {
      assert.isArray(data['param-0'])
    })
    it(`#isArray(data[ 'param-1' ])`, () => {
      assert.isArray(data['param-1'])
    })
    it(`data[ 'param-0' ].length = 2`, () => {
      assert.strictEqual(data['param-0'].length, 2, 'The length it\'s wrong!')
    })
    it(`data[ 'param-1' ].length = 2`, () => {
      assert.strictEqual(data['param-1'].length, 2, 'The length it\'s wrong!')
    })
  })
})