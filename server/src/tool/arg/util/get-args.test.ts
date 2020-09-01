import { getArgs } from './get-args';
import { assert } from 'chai';

describe('Testing "./tool/arg/util/get-args"', () => {
  describe('Test some input arrays', () => {
    it('In: []                                          → Out: []', () => {
      const out = getArgs([])
      assert.isArray(out)
      assert.strictEqual(out.length, 0, 'The current length it\'s wrong!')
    })
    
    it(`In: [ process.execPath ]                        → Out: []`, () => {
      const out = getArgs([ process.execPath ])
      assert.isArray(out)
      assert.strictEqual(out.length, 0, 'The current length it\'s wrong!')
    })
    
    it(`In: [ process.execPath, process.cwd() ]         → Out: []`, () => {
      const out = getArgs([ process.execPath, process.cwd() ])
      assert.isArray(out)
      assert.strictEqual(out.length, 0, 'The current length it\'s wrong!')
    })
    
    it(`In: [ 'test' ]                                  → Out: [ 'test' ]`, () => {
      const out = getArgs([ 'test' ])
      assert.isArray(out)
      assert.strictEqual(
        out.length, 1, 
        'The current length it\'s wrong!'
      )
      assert.sameMembers(out, [ 'test' ])
    })
    
    it(`In: [ process.execPath, 'test' ]                → Out: [ 'test' ]`, () => {
      const out = getArgs([ process.execPath, 'test' ])
      assert.isArray(out)
      assert.strictEqual(
        out.length, 1, 
        'The current length it\'s wrong!'
      )
      assert.sameMembers(out, [ 'test' ])
    })
    
    it(`In: [ process.execPath, process.cwd(), 'test' ] → Out: [ 'test' ]`, () => {
      const out = getArgs([ process.execPath, process.cwd(), 'test' ])
      assert.isArray(out)
      assert.strictEqual(
        out.length, 1, 
        'The current length it\'s wrong!'
      )
      assert.sameMembers(out, [ 'test' ])
    })
  })
})