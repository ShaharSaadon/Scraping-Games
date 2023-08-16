const puppeteer = require('puppeteer');

// async function scrapeJobs() {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://jobs.apple.com/en-il/search?location=israel-ISR');

//   // Wait for the job listings to load
//   await page.waitForSelector('.job-listing-container');

//   const jobs = await page.evaluate(() => {
//     const jobElements = document.querySelectorAll('.job-listing-container');
//     let jobsArray = [];
//     for (let job of jobElements) {
//       let jobTitle = job.querySelector('.job-title-selector').innerText;
//       let jobUrl = job.querySelector('a').href;
//       jobsArray.push({ title: jobTitle, url: jobUrl });
//     }
//     return jobsArray;
//   });

//   console.log(jobs);

//   await browser.close();
// }

// async function takeScreenshot() {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://www.example.com');

//   await page.screenshot({ path: 'example.png' });

//   await browser.close();
// }

// async function getWeather() {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://www.weather.com/weather/today/l/USNY0996:1:US');

//   const weather = await page.evaluate(() => {
//     const temperature = document.querySelector(
//       '.CurrentConditions--tempValue--3KcTQ'
//     ).innerText;
//     const condition = document.querySelector(
//       '.CurrentConditions--phraseValue--2xXSr'
//     ).innerText;
//     return { temperature, condition };
//   });

//   console.log(weather);

//   await browser.close();
// }

async function getWeather() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.weather.com/weather/today/l/USNY0996:1:US');

  // Wait for the temperature and condition elements to load
  await page.waitForSelector('.CurrentConditions--tempValue--3KcTQ');
  await page.waitForSelector('.CurrentConditions--phraseValue--2xXSr');

  const weather = await page.evaluate(() => {
    const temperature = document.querySelector(
      '.CurrentConditions--tempValue--3KcTQ'
    ).innerText;
    const condition = document.querySelector(
      '.CurrentConditions--phraseValue--2xXSr'
    ).innerText;
    return { temperature, condition };
  });

  console.log(weather);

  await browser.close();
}

// getWeather();

getWeather();

// takeScreenshot();

// scrapeJobs();
