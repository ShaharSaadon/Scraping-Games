const fs = require('fs');
const axios = require('axios');

const searchWordInUrls = async (filePath, searchWord) => {
  try {
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const results = JSON.parse(jsonData);

    for (const url of results) {
      try {
        const response = await axios.get(url);
        const htmlContent = response.data;

        // Perform a case-insensitive search for the word in the HTML content
        const regex = new RegExp(searchWord, 'i');
        const match = regex.test(htmlContent);

        if (match) {
          console.log(`Found '${searchWord}' in URL: ${url}`);
        } else {
          console.log(`'${searchWord}' not found in URL: ${url}`);
        }
      } catch (error) {
        console.error(`Error fetching URL '${url}':`, error.message);
      }
    }
  } catch (error) {
    console.error('Error reading JSON file:', error);
  }
};

// Usage
const filePath = 'search_results.json'; // Path to your JSON file
const searchWord = 'your_search_word'; // The word you want to search for

searchWordInUrls(filePath, searchWord);
