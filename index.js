const puppeteer = require('puppeteer');


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.promart.pe/construccion/tableros-aglomerados/melamina');
  let products = [];
  let productNames = [];
  let productListPrices = [];
  let productBestPrices = [];

  productNames = await page.$$eval(".item-product", e => e.map(el => 
    el.getElementsByTagName('div').item(0).getAttribute('data-name'))
  );
  
  productListPrices = await page.$$eval(".item-product", e => e.map(el => 
    el.getElementsByTagName('div').item(0).getAttribute('data-list-price'))
  );

  productBestPrices = await page.$$eval(".item-product", e => e.map(el =>
    el.getElementsByTagName('div').item(0).getAttribute('data-best-price'))
  );

  for (let i=0; i<productNames.length; i++)
  {
    products.push({ 
      name : productNames[i],
      listPrice : productListPrices[i],
      bestPrice : productBestPrices[i]
    });
  }

  console.log(products.length);

  products.forEach(p => console.log(p));

  await browser.close();
})();