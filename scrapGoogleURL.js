const puppeteer = require('puppeteer');

(async () => {
const browser = await puppeteer.launch({headless:true});
const page = await browser.newPage();
const navigationPromise = page.waitForNavigation();
// await page.setViewport({ width: 2000, height: 836 });
function hour() {
  let now = new Date();
  let hour = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
  return hour;
}
console.log('Navigateur ouvert | ' + hour());

await page.goto('https://www.google.com/');
await page.waitForSelector('#L2AGLb > div');
await page.click('#L2AGLb > div');

let random = Math.round(Math.random() * (150 - 50) + 50);

let serpAll = [];
let queries = ['keyword'];

console.log('Début du scrap de ' + queries.length + ' mots-clés | ' + hour());

  for (let query of queries){
    await page.goto('https://www.google.com/search?q=' + query + '');
    let wait = (Math.floor(Math.random() * 4) + 2) * 1000;
    console.log('Pause de ' + wait/1000 + ' secondes | ' + hour());
    await page.waitForTimeout(wait);

    let serp = await page.evaluate(() => {
        let data = [];
        let elements = document.querySelectorAll('.yuRUbf');

        for (let element of elements) {
          let title = element.querySelector('a').href;
          //let titleClean = title.replaceAll(',','');
          data.push(title);
        }
        return data;
    })
    console.log(serp);

    serpAll.push(query + "," + serp);
    let i = queries.indexOf(query);
    i++;
    console.log('Scrap de "' + query + '" [' + i  + '/' + queries.length + '] | ' + hour());
    // console.log(random);
    if(i === random)
    {
      random = random + Math.round(Math.random() * (150 - 50) + 50);
      console.log('Pause suppélmentaire de ' + (wait*2)/1000 + ' secondes | ' + hour());
      await page.waitForTimeout(wait*2);
    }
  }

console.log('Fin du scrap | ' + hour());
console.dir(serpAll, {'maxArrayLength': null});

await navigationPromise;
await browser.close();
console.log('Navigateur fermé');
})()
