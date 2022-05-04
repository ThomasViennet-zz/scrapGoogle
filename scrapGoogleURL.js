const puppeteer = require('puppeteer');

(async () => {
const browser = await puppeteer.launch({headless:true});
const page = await browser.newPage();
const navigationPromise = page.waitForNavigation();
// await page.setViewport({ width: 2000, height: 836 });
console.log('Navigateur ouvert');

await page.goto('https://www.google.com/');
await page.waitForSelector('#L2AGLb > div');
await page.click('#L2AGLb > div');
console.log('Début du scrap');

let random = Math.round(Math.random() * (150 - 50) + 50);

let serpAll = [];
var queries = ['query'];

  for (let query of queries){
    await page.goto('https://www.google.com/search?q=' + query + '');
    let wait = (Math.floor(Math.random() * 4) + 2) * 1000;
    console.log('Pause de ' + wait/1000 + ' secondes');
    await page.waitForTimeout(wait);

    let serp = await page.evaluate(() => {
        let data = [];
        let elements = document.querySelectorAll('.yuRUbf');

        for (let element of elements){
          let title = element.querySelector('h3').innerText;
          let titleClean = title.replaceAll(',','');
          data.push(titleClean);
        }
        return data;
    })
    console.log(serp);

    serpAll.push(query + "," + serp);
    let i = queries.indexOf(query);
    i++;
    console.log('Scrap de "' + query + '" [' + i  + '/' + queries.length + ']');
    console.log(random);
    if(i === random)
    {
      console.log('Pause suppélmentaire de ' + wait/1000 + ' secondes');
      random = random + Math.round(Math.random() * (150 - 50) + 50);
      await page.waitForTimeout(wait*2);
    }
  }
console.log('Fin du scrap');
console.dir(serpAll, {'maxArrayLength': null});

await navigationPromise
await browser.close()
console.log('Navigateur fermé');
})()
