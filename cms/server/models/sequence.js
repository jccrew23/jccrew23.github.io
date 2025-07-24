const mongoose = require('mongoose');

// Define the schema for a sequence
const sequenceSchema = new mongoose.Schema({
  maxDocumentId: { type: Number },
  maxContactId: { type: Number },
  maxMessageId: { type: Number }
});

module.exports = mongoose.model('Sequence', sequenceSchema);
