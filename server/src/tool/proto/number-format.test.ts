import './number-format';
import { assert } from 'chai';

describe('Testing "./tool/proto/number-format"', () => {
    it('Convert 12345 → "12345.000"', () => {
        assert.strictEqual(
            (12345 as number).format(5, 3, '.'),
            '12345.000'
        );
    });
    
    it('Convert 9.025 → "0009.0250"', () => {
        assert.strictEqual(
            (9.025 as number).format(4, 4, '.'),
            '0009.0250'
        );
    });
    
    it('Convert 9999.9999 → "9999.9"', () => {
        assert.strictEqual(
            (9999.9999 as number).format(4, 1),
            '9999.9'
        );
    });
});
