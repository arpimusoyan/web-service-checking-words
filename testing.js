const axios = require('axios');

const testWords = ['Hello', 'worlds', 'examples', 'nonexistent'];

async function testSearchEndpoint(word) {
  try {
    const response = await axios.get(`http://localhost:3000/word/search?w=${word}`);
    console.log(`${word} exists.`);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log(`${word} does not exist.`);
    } else {
      console.error(`Error testing ${word}:`, error);
    }
  }
}

async function testNormalizeEndpoint(word) {
  try {
    const response = await axios.post('http://localhost:3000/word/normalize', { word });
    const normalizedWord = response.data.result;
    console.log(`Normalized word for ${word}: ${normalizedWord}`);
  } catch (error) {
    console.error(`Error normalizing ${word}:`, error);
  }
}

async function performTesting() {
  for (const word of testWords) {
    await testSearchEndpoint(word);
    await testNormalizeEndpoint(word);
  }
}

performTesting();
