const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const WordModel = require('./word-model');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/firstdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => console.error('Error connecting to MongoDB:', error));

app.listen(3000, () => {
    console.log('Server running on PORT 3000');
})

app.use(bodyParser.json());

app.get('/word/search', (req, res) => {
    const queryWord = req.query.w;

    WordModel.findOne({
        word: queryWord.toLowerCase(),
    }).then((result) => {
        if (result) {
            res.send({word: result}).status(201);
        } else {
            res.sendStatus(404);
        }
    }).catch((err) => {
        console.error(err);
        res.sendStatus(500);
    })
});

app.post('/word/normalize', (req, res) => {
    const wordInBody = req.body.word;
    const result = singularizeWord(wordInBody).toLowerCase();

    res.send({result});
})

function singularizeWord(word) {
    const rules = [
        [/(quiz)zes$/i, "$1"],
        [/([m|l])ice$/i, "$1ouse"],
        [/(matr|vert|ind)(ix|ex)$/i, "$1ix"],
        [/(x|ch|ss|sh)es$/i, "$1"],
        [/([m|l])ves$/i, "$1f"],
        [/(tive)s$/i, "$1"],
        [/(hive)s$/i, "$1"],
        [/([^aeiouy]|qu)ies$/i, "$1y"],
        [/s$/i, ""]
    ];

    for (let i = 0; i < rules.length; i++) {
        const [pattern, replacement] = rules[i];
        if (pattern.test(word)) {
          return word.replace(pattern, replacement);
        }
      }
    
      return word;
}