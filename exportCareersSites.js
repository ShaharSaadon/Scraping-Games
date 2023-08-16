const axios = require('axios');
const fs = require('fs');

const apiKey = 'AIzaSyB-uLtqF8tjFtFltS2nIDsqGWTHltt8FW0';
const searchEngineId = '6626afcb15cc94a0a';
const searchQuery =
  '"junior fullstack" OR "frontend developer" OR "junior full stack" OR "careers" + intext:"tel aviv" OR "israel" +  inurl:"careers"';
const numPages = 10; // Number of pages to fetch

// Set up the API request
const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(
  searchQuery
)}`;

const fetchSearchResults = async () => {
  const results = []; // To store the search results

  // Fetch search results for each page
  for (let page = 1; page <= numPages; page++) {
    const start = (page - 1) * 10 + 1;
    const apiUrl = `${url}&start=${start}`;

    try {
      const response = await axios.get(apiUrl);
      const data = response.data;

      // Extract the URLs from the search results
      const items = data.items || [];
      items.forEach((item) => {
        const url = item.link;
        results.push(url);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Print the search results
  results.forEach((url) => console.log(url));

  // Write the search results to a JSON file
  fs.writeFile(
    'search_results.json',
    JSON.stringify(results, null, 2),
    (err) => {
      if (err) {
        console.error('Error writing to JSON file:', err);
      } else {
        console.log('Search results exported to search_results.json');
      }
    }
  );
};

fetchSearchResults();
