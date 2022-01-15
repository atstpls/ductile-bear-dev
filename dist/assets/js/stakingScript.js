


//1. Import coingecko-api
const CoinGecko = require('coingecko-api');

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

//3. Make calls
var func = async() => {
    var cro = '0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b';
    let data = await CoinGeckoClient.simple.fetchTokenPrice({
        contract_addresses: cro,
        vs_currencies: 'usd',
    });
    console.log(data);

};
