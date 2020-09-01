import './string-capitalize';
import { assert } from 'chai';

describe('Testing "./tool/proto/string-capitalize"', () => {
    it('Capitalize "hello world"', () => {
        assert.strictEqual(
            'hello world'.capitalize(),
            'Hello World'
        );
    })

    it('Capitalize "testing     another     syntax"', () => {
        assert.strictEqual(
            'testing     another     syntax'.capitalize(),
            'Testing     Another     Syntax'
        );
    })

    it('Capitalize "átest étest ítest ótest útest"', () => {
        assert.strictEqual(
            'átest étest ítest ótest útest'.capitalize(),
            'Átest Étest Ítest Ótest Útest'
        );
    })
});