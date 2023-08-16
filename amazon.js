import puppeteer from 'puppeteer';
const URL = 'https://www.amazon.com/s?k=a&crid=2AXM3WZX7M3S8&sprefix=a%2Caps%2C572&ref=nb_sb_noss_2'
scrapeProduct(URL)

async function scrapeProduct(URL) {
    const browser = await puppeteer.launch({ headless: "new" })
    const page = await browser.newPage()
    console.log('Navigating to URL:', URL);
    await page.goto(URL, { waitUntil: 'networkidle2' })

    console.log('Selecting all elements with class "s-widget-container"');
    await page.screenshot({ path: 'screenshot9.png' }) //this is amazing way to debug your code.
    const elements = await page.$$('.s-widget-container');
    console.log('Number of elements with class "s-widget-container":', elements.length);
    for (const element of elements) {
        const src = await element.getProperty('innerText');
        const srcTxt = await src.jsonValue();
        console.log('innerText:', srcTxt.trim()); // Use trim() to remove extra spaces
    }

    await browser.close();

}