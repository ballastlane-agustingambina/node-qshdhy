const getExchangeRate = require('./getExchangeRate');

describe('getExchangeRate', () => {
  test('error when missing currencies', async () => {
    await expect(getExchangeRate(null, null)).rejects.toThrow(
      'Currencies required'
    );
  });
});
