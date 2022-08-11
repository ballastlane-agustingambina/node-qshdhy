const axios = require('axios');
const getExchangeRate = require('./getExchangeRate');

jest.mock('axios');

const old_env = process.env;
beforeAll(() => {
  process.env = {
    ...old_env,
    EXCHANGE_RATE_API_KEY: 'mocked-EXCHANGE_RATE_API_KEY',
  };
});

afterAll(() => {
  process.env = old_env;
});

describe('getExchangeRate', () => {
  test('error when missing currencies', async () => {
    await expect(getExchangeRate(null, null)).rejects.toThrow(
      'Currencies required'
    );
  });

  test('url to call exchange rate', async () => {
    const expectedURL =
      'https://v6.exchangerate-api.com/v6/mocked-EXCHANGE_RATE_API_KEY/latest/USD';

    axios.get.mockResolvedValue({
      data: { conversion_rates: { USD: 1, EUR: 0.98 } },
    });

    await getExchangeRate('USD', 'EUR');
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(expectedURL);
  });

  test('resolved value', async () => {
    const expectedURL =
      'https://v6.exchangerate-api.com/v6/mocked-EXCHANGE_RATE_API_KEY/latest/USD';

    axios.get.mockResolvedValue({
      data: { conversion_rates: { CAD: 1.28, EUR: 0.98 } },
    });

    const result = await getExchangeRate('USD', 'EUR');
    expect(result).toEqual(0.98);
  });

  test('error when getting exchange rate', async () => {
    axios.get.mockRejectedValue('some-error');
    await expect(getExchangeRate('USD', 'EUR')).rejects.toThrow(
      'Error fetching information from exchange rate API'
    );
  });
});
