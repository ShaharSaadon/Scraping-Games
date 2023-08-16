const cheerio = require('cheerio');
const axios = require('axios');

scrapeSoldiers()
// URL of the search page with the "From" date set to "01/01/2000"

async function scrapeSoldiers() {
    const soldierData = [];
    const searchUrl = 'https://www.izkor.gov.il/search?startDate=01%2F01%2F2000&tab=3';

  // Get the HTML content of the search page
  const response = await axios.get(searchUrl);
  const html = response.data;

  // Use Cheerio to extract the soldier data from the search results page
  const $ = cheerio.load(html);
  $('div.soldier-box').each((i, soldier) => {
    const name = $(soldier).find('h2').text().trim();
    const unit = $(soldier).find('span:eq(0)').text().trim();
    const rank = $(soldier).find('span:eq(1)').text().trim();
    const date = $(soldier).find('span:eq(2)').text().trim();
    const imgUrl = $(soldier).find('img').attr('src');
    const profileUrl = $(soldier).find('a').attr('href');

    soldierData.push({
      name,
      unit,
      rank,
      date,
      imgUrl,
      profileUrl,
    });
  });
console.log('soldierData:', soldierData)
  return soldierData;
}