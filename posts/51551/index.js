'use strict';
const ccxt = require('ccxt');

(async function () {
    try {
        const zaif = new ccxt.zaif(); // zaif apiの機能を使えるようにします
        const pair = 'XEM/JPY';
        const ticker = await zaif.fetchTicker(pair);
        console.log(`XEM 現在価格: ${ticker['last']} JPY`);
    } catch (e) {
        console.log(e.message);
    }
})();
