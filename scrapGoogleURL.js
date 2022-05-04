const puppeteer = require('puppeteer');

(async () => {
const browser = await puppeteer.launch({headless:true});
const page = await browser.newPage();
const navigationPromise = page.waitForNavigation();
// await page.setViewport({ width: 2000, height: 836 });

let serpAll = [];

await page.goto('https://www.google.com/');
await page.waitForSelector('#L2AGLb > div');
await page.click('#L2AGLb > div');
// await page.waitFor(1000);

var queries = ['Query'];

  for (let query of queries){
    await page.goto('https://www.google.com/search?q=' + query + '');
    await page.waitForTimeout(2000);

    let serp = await page.evaluate(() => {
        let data = [];
        let elements = document.querySelectorAll('.yuRUbf');

        for (let element of elements){
          let title = element.querySelector('h3').innerText;
          data.push(title);
        }

        return data;
    })
    serpAll.push(query + "," + serp);
    i = queries.indexOf(query);
    i++;
    console.log('Mot-clé : ' + query + ' [' + i  + '/' + queries.length + ']');
  }

console.dir(serpAll, {'maxArrayLength': null});

await navigationPromise
await browser.close()
})()
