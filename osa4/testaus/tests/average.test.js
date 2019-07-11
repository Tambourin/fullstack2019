const average = require('../index').average;

describe('average', () => {
  test('average of 1 and 2', () => {
    const result = average([ 1, 2 ]);
    expect(result).toBe(1.5);
  });
  
  test('average of one value', () => {
    const result = average([10]);
    expect(result).toBe(10);
  });
  
  test('test zero', () => {
    const result = average([ 0, 0, 0 ]);
    expect(result).toBe(0);
  });
  
  test('zero length', () => {
    const result = average([]);
    expect(result).toBe(0);
  });
})
