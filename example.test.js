const { calc, processArray } = require('./example');

describe('calc', () => {
  test('should correctly perform addition', () => {
    expect(calc(1, 2, '+')).toBe(3);
  });

  test('should correctly perform subtraction', () => {
    expect(calc(5, 2, '-')).toBe(3);
  });

  test('should correctly perform multiplication', () => {
    expect(calc(3, 4, '*')).toBe(12);
  });

  test('should correctly perform division', () => {
    expect(calc(10, 2, '/')).toBe(5);
  });

  test('should throw an error for division by zero', () => {
    expect(() => calc(10, 0, '/')).toThrow('Divide by zero');
  });

  test('should return null for an invalid operator', () => {
    expect(calc(1, 2, '%')).toBeNull();
  });
});

describe('processArray', () => {
  test('should double even numbers and leave odd numbers unchanged', () => {
    expect(processArray([1, 2, 3, 4, 0])).toEqual([1, 4, 3, 8, 0]);
  });

  test('should return an empty array if an empty array is provided', () => {
    expect(processArray([])).toEqual([]);
  });

  test('should handle arrays with only even numbers', () => {
    expect(processArray([2, 4, 6])).toEqual([4, 8, 12]);
  });

  test('should handle arrays with only odd numbers', () => {
    expect(processArray([1, 3, 5])).toEqual([1, 3, 5]);
  });
});