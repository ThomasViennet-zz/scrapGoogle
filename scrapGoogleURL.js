const puppeteer = require('puppeteer');

(async () => {
const browser = await puppeteer.launch({headless:true});
const page = await browser.newPage();
const navigationPromise = page.waitForNavigation();
// await page.setViewport({ width: 2000, height: 836 });
console.log('Navigateur ouvert');

let serpAll = [];
let wait = (Math.floor(Math.random() * 4) + 2) * 1000;

await page.goto('https://www.google.com/');
await page.waitForSelector('#L2AGLb > div');
await page.click('#L2AGLb > div');
// await page.waitFor(1000);
console.log('Début du scrap');

var queries = ['query'];


  for (let query of queries){
    await page.goto('https://www.google.com/search?q=' + query + '');
    console.log('Pause de ' + wait/1000 + ' secondes');
    await page.waitForTimeout(wait);


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
    console.log('Scrap de "' + query + '" [' + i  + '/' + queries.length + ']');
    if(Number.isInteger(i/10))
    {
      console.log('Pause suppélmentaire de ' + wait/1000 + ' secondes');
      await page.waitForTimeout(wait);
    }
  }
console.log('Fin du scrap');
console.dir(serpAll, {'maxArrayLength': null});

await page.waitForTimeout(wait);
await navigationPromise
await browser.close()
console.log('Navigateur fermé');
})()
