const puppeteer = require('puppeteer');

(async () => {
const browser = await puppeteer.launch({headless:true});
const page = await browser.newPage();
const navigationPromise = page.waitForNavigation();
// await page.setViewport({ width: 2000, height: 836 });
console.log('Navigateur ouvert');

let serpAll = [];

await page.goto('https://www.google.com/');
await page.waitForSelector('#L2AGLb > div');
await page.click('#L2AGLb > div');
// await page.waitFor(1000);
console.log('Début du scrap');

var queries = ['casaque', 'blouse de travail'];


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
    i = queries.indexOf(query);
    i++;
    console.log('Scrap de "' + query + '" [' + i  + '/' + queries.length + ']');
    if(Number.isInteger(i/100))
    {
      console.log('Pause suppélmentaire de ' + wait/1000 + ' secondes');
      await page.waitForTimeout(wait);
    }
  }
console.log('Fin du scrap');
console.dir(serpAll, {'maxArrayLength': null});

await navigationPromise
await browser.close()
console.log('Navigateur fermé');
})()
