const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const emptyResponce = '[{"img":"https://crossoutdb.com/undefined","title":"","sell":"","craftSell":"","buy":"","craftBuy":"","craftMargin":""}]'
let counterError = 0
const initResponce = {
    img: '',
    title: '',
    sell: '',
    craftSell: '',
    buy: '',
    craftBuy: '',
    craftMargin: '',
}

async function requestToCrossoutDB([url, secondUrl]) {
    console.log('url', [url, secondUrl])

    const browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();
    await page.setCookie({name: 'language', value: 'ru', domain: 'crossoutdb.com'});
    await page.goto(url, {"waitUntil": "networkidle0"});

    const content = await page.content();
    const $ = cheerio.load(content);
    const empty = $('.dataTables_empty').text()

    let responce = []

    if (empty === 'No matching records found' && secondUrl) {
        counterError = 0
        return await requestToCrossoutDB([secondUrl])
    }

    counterError++

    $('.selectable-row').each((i, element) => {
        let res = initResponce;
        $(element).find('td').each((j, element2) => {

            if (j === 0) {
                const img = $(element2).find('div div a img').attr('src');
                const title = $(element2).find('div').next().text();
                res.img = `https://crossoutdb.com/${img}`
                res.title = title
            }
            if (j === 11) {
                const sell = $(element2).find('div div').text();
                res.sell = sell
            }
            if (j === 13) {
                const craftSell = $(element2).find('div div').text();
                res.craftSell = craftSell
            }
            if (j === 14) {
                const buy = $(element2).find('div div').text();
                res.buy = buy
            }
            if (j === 16) {
                const craftBuy = $(element2).find('div div').text();
                res.craftBuy = craftBuy
            }
            if (j === 20) {
                const craftMargin = $(element2).find('div div').text();
                res.craftMargin = craftMargin
            }
        });
        responce.push(res)
    });

    browser.close();

    if (counterError === 2) {
        return []
    }

    if (JSON.stringify(responce) === emptyResponce) {
        console.error('ERROR')
        responce = await requestToCrossoutDB([url])
    }
    return responce
}

module.exports = requestToCrossoutDB;