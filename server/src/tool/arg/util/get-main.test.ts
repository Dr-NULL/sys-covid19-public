import { getMain } from './get-main';
import { assert } from 'chai';

describe('Testing "./tool/arg/util/get-main"', () => {
  describe(`Test [ 'main0' ]`, () => {
    const argv = [ 'main0' ]
    it('#isArray()', () => {
      const main = getMain(argv.map(x => x))
      assert.isArray(main)
    })
    it(`main.length = 1`, () => {
      const main = getMain(argv.map(x => x))
      assert.strictEqual(
        main.length, 1,
        'The current length it\'s wrong!'
      )
    })
  })

  describe(`Test [ 'main0', 'main1' ]`, () => {
    const argv = [ 'main0', 'main1' ]
    it('#isArray()', () => {
      const main = getMain(argv.map(x => x))
      assert.isArray(main)
    })
    it(`main.length = 2`, () => {
      const main = getMain(argv.map(x => x))
      assert.strictEqual(
        main.length, 2,
        'The current length it\'s wrong!'
      )
    })
  })

  describe(`Test [ 'main0', '-param-0' ]`, () => {
    const argv = [ 'main0', '-param-0' ]
    it('#isArray()', () => {
      const main = getMain(argv.map(x => x))
      assert.isArray(main)
    })
    it(`main.length = 1`, () => {
      const main = getMain(argv.map(x => x))
      assert.strictEqual(
        main.length, 1,
        'The current length it\'s wrong!'
      )
    })
  })

  describe(`Test [ 'main0', '-param-0', 'value' ]`, () => {
    const argv = [ 'main0', '-param-0', 'value' ]
    it('#isArray()', () => {
      const main = getMain(argv.map(x => x))
      assert.isArray(main)
    })
    it(`main.length = 1`, () => {
      const main = getMain(argv.map(x => x))
      assert.strictEqual(
        main.length, 1,
        'The current length it\'s wrong!'
      )
    })
  })

  describe(`Test [ 'main0', '--param-0', 'value' ]`, () => {
    const argv = [ 'main0', '--param-0', 'value' ]
    it('#isArray()', () => {
      const main = getMain(argv.map(x => x))
      assert.isArray(main)
    })
    it(`main.length = 1`, () => {
      const main = getMain(argv.map(x => x))
      assert.strictEqual(
        main.length, 1,
        'The current length it\'s wrong!'
      )
    })
  })

  describe(`Test [ 'main0', 'main1', '--param-0', 'value' ]`, () => {
    const argv = [ 'main0', 'main1', '--param-0', 'value' ]
    it('#isArray()', () => {
      const main = getMain(argv.map(x => x))
      assert.isArray(main)
    })
    it(`main.length = 2`, () => {
      const main = getMain(argv.map(x => x))
      assert.strictEqual(
        main.length, 2,
        'The current length it\'s wrong!'
      )
    })
  })
})