const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const urlModule = require('url');

const app = express();
const PORT = 8000;

async function scrapePage(pageNumber, config) {
  let url = config.startUrl[0].replace('[1-7]', pageNumber.toString());
  const baseUrl =
    urlModule.parse(url).protocol + '//' + urlModule.parse(url).host;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    let jobs = [];
    $(config.selectors[1].selector).each((i, link) => {
      const title = $(link).text().trim();
      const url = baseUrl + $(link).attr('href');
      jobs.push({ domain: config._id, title, url });
    });

    return jobs;
  } catch (err) {
    console.error(err);
    return null;
  }
}

app.get('/scrape', async (req, res) => {
  const configs = [
    {
      _id: 'Apple',
      startUrl: [
        'https://jobs.apple.com/en-il/search?location=israel-ISR&page=[1-7]',
      ],
      selectors: [
        {
          id: 'job-title',
          parentSelectors: ['_root'],
          type: 'SelectorLink',
          selector: 'a.table--advanced-search__title',
          multiple: false,
        },
        {
          id: 'Jobs',
          parentSelectors: ['_root'],
          type: 'SelectorLink',
          selector: 'a.table--advanced-search__title',
          multiple: true,
        },
      ],
    },
    {
      _id: 'AutoDesk',
      startUrl: [
        'https://autodesk.wd1.myworkdayjobs.com/Ext?locationCountry=084562884af243748dad7c84c304d89a',
      ],
      selectors: [
        {
          id: 'Job title',
          parentSelectors: ['_root'],
          type: 'SelectorText',
          selector: 'a.css-19uc56f',
          multiple: true,
          regex: '',
        },
        {
          id: 'Job Link',
          parentSelectors: ['_root'],
          type: 'SelectorLink',
          selector: 'a.css-19uc56f',
          multiple: true,
        },
      ],
    },
  ];

  let allJobs = [];

  for (let config of configs) {
    let i = 1;
    let jobs = [];
    do {
      jobs = await scrapePage(i, config);
      if (jobs !== null) {
        allJobs = allJobs.concat(jobs);
      }
      i++;
    } while (jobs !== null && jobs.length > 0);
  }

  res.json(allJobs);
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
