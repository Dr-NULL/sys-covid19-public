import { Arg } from './arg';
import { assert } from 'chai';

describe('Testing "./tool/arg/arg"', () => {
  describe(`Test Case 01`, () => {
    const argv = [
      'main0', 'main1', 'main2'
    ]

    it('check → args.main', () => {
      const args = new Arg(argv)
      assert.isArray(args.main)
      assert.strictEqual(args.main.length, 3, 'The current length it\'s wrong!')
      assert.sameOrderedMembers(args.main, [ 'main0', 'main1', 'main2' ])
    })

    it('check → args.data', () => {
      const args = new Arg(argv)
      assert.isObject(args.data)
      assert.isEmpty(args.data)
    })
  })

  describe(`Test Case 02`, () => {
    const argv = [
      'main0', 'main1', 'main2',
      '--param0', 'value0', 'value1',
      '--param1', 'value2', 'value3'
    ]

    it('check → args.main', () => {
      const args = new Arg(argv)
      assert.isArray(args.main)
      assert.strictEqual(args.main.length, 3, 'The current length it\'s wrong!')
      assert.sameOrderedMembers(args.main, [ 'main0', 'main1', 'main2' ])
    })

    it('check → args.data', () => {
      const args = new Arg(argv)
      assert.isObject(args.data)
      assert.containsAllKeys(args.data, [ 'param0', 'param1' ])
      assert.isArray(args.data['param0'])
      assert.isArray(args.data['param1'])
      assert.strictEqual(args.data['param0'].length, 2, 'The current length it\'s wrong!')
      assert.strictEqual(args.data['param1'].length, 2, 'The current length it\'s wrong!')
    })
  })

  describe(`Test Case 03`, () => {
    const argv = [
      process.execPath,
      process.cwd(),
      'main0', 'main1', 'main2',
      '-param0', 'value0', 'value1',
      '-param1', 'value2', 'value3'
    ]

    it('check → args.main', () => {
      const args = new Arg(argv)
      assert.isArray(args.main)
      assert.strictEqual(args.main.length, 3, 'The current length it\'s wrong!')
      assert.sameOrderedMembers(args.main, [ 'main0', 'main1', 'main2' ])
    })

    it('check → args.data', () => {
      const args = new Arg(argv)
      assert.isObject(args.data)
      assert.containsAllKeys(args.data, [ 'param0', 'param1' ])
      assert.isArray(args.data['param0'])
      assert.isArray(args.data['param1'])
      assert.strictEqual(args.data['param0'].length, 2, 'The current length it\'s wrong!')
      assert.strictEqual(args.data['param1'].length, 2, 'The current length it\'s wrong!')
    })
  })
})