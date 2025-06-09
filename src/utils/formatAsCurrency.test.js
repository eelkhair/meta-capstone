import formatAsCurrency from './formatAsCurrency';

describe('formatAsCurrency', () => {
    test('formats a positive decimal number', () => {
        expect(formatAsCurrency(1234.56)).toBe('$1,234.56');
    });

    test('formats a whole number', () => {
        expect(formatAsCurrency(1000)).toBe('$1,000.00');
    });

    test('formats zero as currency', () => {
        expect(formatAsCurrency(0)).toBe('$0.00');
    });

    test('formats a negative number', () => {
        expect(formatAsCurrency(-250)).toBe('-$250.00');
    });

    test('formats large numbers with commas', () => {
        expect(formatAsCurrency(1000000)).toBe('$1,000,000.00');
    });

    test('formats small decimals correctly', () => {
        expect(formatAsCurrency(0.1)).toBe('$0.10');
        expect(formatAsCurrency(0.99)).toBe('$0.99');
    });

    test('formats numeric strings correctly', () => {
        expect(formatAsCurrency('89.95')).toBe('$89.95');
        expect(formatAsCurrency('1000')).toBe('$1,000.00');
    });

    test('returns "Invalid" for non-numeric string', () => {
        expect(formatAsCurrency('hello')).toBe('Invalid');
    });

    test('returns "Invalid" for undefined', () => {
        expect(formatAsCurrency(undefined)).toBe('Invalid');
    });

    test('formats null as "$0.00"', () => {
        expect(formatAsCurrency(null)).toBe('$0.00'); // null coerces to 0
    });

    test('returns "Invalid" for NaN input', () => {
        expect(formatAsCurrency(NaN)).toBe('Invalid');
    });
});
