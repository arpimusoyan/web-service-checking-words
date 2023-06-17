const WordModel = require('./word-model');
const readline = require('readline');
const mongoose = require('mongoose');
const fs = require('fs');

mongoose.connect('mongodb://localhost:27017/firstdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    populateDatabase();
  })
  .catch((error) => console.error('Error connecting to MongoDB:', error));

function populateDatabase() {
    const stream = fs.createReadStream('./words_alpha.txt');
    const reader = readline.createInterface({
      input: stream,
      crlfDelay: Infinity,
    });
  
    let counter = 0;
  
    reader.on('line', (line) => {
      const word = line.trim().toLowerCase();
      const newWord = new WordModel({ word });
  
      newWord.save()
        .then(() => {
          counter++;
          console.log(`Added word: ${word}`);
        })
        .catch((error) => console.error(`Error adding word: ${word}`, error));
    });
}

module.exports = populateDatabase;