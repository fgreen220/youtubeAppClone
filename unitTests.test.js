const testFunctions = require('./dummyFunction.jsx');

test('Test addition result', () => {
  expect(testFunctions.addNumbers(5,10)).not.toBe(14);
})