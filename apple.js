const PORT = 8000;

const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();
async function scrapePage(pageNumber) {
  const url = `https://jobs.apple.com/en-il/search?location=israel-ISR&page=${pageNumber}`;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    let jobs = [];
    let idx = 0;
    $('.table--advanced-search__title', data).each(function () {
      //   const url = $(this).attr('href');
      const title = $(this).text();
      const url = 'https://jobs.apple.com/' + $(this).attr('href');
      jobs.push({
        id: idx.toString(),
        title,
        url,
      });
      idx++;
    });

    // Filtering step
    // const regex = //i;
    //   (jobs = jobs.filter((job) => regex.test(job.title)));

    return jobs.length > 0 ? jobs : null;
  } catch (err) {
    console.error(err);
  }
}
app.get('/scrape', async (req, res) => {});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
