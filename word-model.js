const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,
        unique: true,
    }
});

const WordModel = mongoose.model('Words', WordSchema);

module.exports = WordModel;