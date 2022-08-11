// Write tests for the following function. Make sure to not call the real API.

const axios = require('axios');

const getExchangeRate = async (baseCurrency, desiredCurrency) => {
  if (!baseCurrency || !desiredCurrency) {
    throw new Error('Currencies required');
  }

  try {
    const url = `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${baseCurrency}`;

    const {
      data: { conversion_rates: conversionRates },
    } = await axios.get(url);

    return conversionRates[desiredCurrency];
  } catch (error) {
    console.log(
      'There was an error while getting the exchange rate',
      error.message
    );

    throw new Error('Error fetching information from exchange rate API');
  }
};

module.exports = getExchangeRate;
