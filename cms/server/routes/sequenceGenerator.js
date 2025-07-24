var Sequence = require('../models/sequence');

var maxDocumentId;
var maxMessageId;
var maxContactId;
var sequenceId = null;

function SequenceGenerator() {

  Sequence.findOne().exec()
  .then(sequence => {
    if (sequence) {
      sequenceId = sequence._id;
      maxDocumentId = sequence.maxDocumentId;
      maxMessageId = sequence.maxMessageId;
      maxContactId = sequence.maxContactId;
      console.log('Sequence generator initialized successfully');
    } else {
      console.log('No sequence found in database');
    }
  })
  .catch(err => {
    console.error('Error initializing sequence generator:', err);
  });

}

SequenceGenerator.prototype.nextId = function(collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'documents':
      maxDocumentId++;
      updateObject = {maxDocumentId: maxDocumentId};
      nextId = maxDocumentId;
      break;
    case 'messages':
      maxMessageId++;
      updateObject = {maxMessageId: maxMessageId};
      nextId = maxMessageId;
      break;
    case 'contacts':
      maxContactId++;
      updateObject = {maxContactId: maxContactId};
      nextId = maxContactId;
      break;
    default:
      return -1;
  }

  Sequence.updateOne({_id: sequenceId}, {$set: updateObject})
    .then(() => {
      console.log(`Updated ${collectionType} sequence to ${nextId}`);
    })
    .catch(err => {
      console.log("nextId error = " + err);
    });

  return nextId;
}

module.exports = new SequenceGenerator();
