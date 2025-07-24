var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Document = require('../models/document');

router.get('/', (req, res, next) => {
  console.log('Attempting to fetch documents...');
  Document.find()
    .populate('children')
    .then(documents => {
      console.log('Documents found:', documents.length);
      console.log('Documents data:', documents);
      res.status(200).json({
        message: 'Success',
        obj: documents
      });
    })
    .catch(err => {
      console.error('Error in documents GET route:', err);
      res.status(500).json({
        title: 'An error occurred',
        error: err.message || err
      });
    });
});

router.post('/', (req, res, next) => {
  console.log('POST /documents - Request body:', req.body);

  const maxDocumentId = sequenceGenerator.nextId('documents');
  const document = new Document({
    id: maxDocumentId,
    name: req.body.name,  // Changed from title to name
    url: req.body.url,
    description: req.body.description,
  });

  console.log('Creating document:', document);

  document.save()
    .then(result => {
      console.log('Document saved successfully:', result);
      res.status(201).json({
        message: 'Document created successfully',
        obj: result  // This matches what the GET route returns
      });
    })
    .catch(err => {
      console.error('Error saving document:', err);
      res.status(500).json({
        title: 'An error occurred',
        error: err.message || err
      });
    });
});

router.put('/:id', (req, res, next) => {
  Document.findOne({id: req.params.id})
    .then(document => {
      document.name = req.body.name;
      document.url = req.body.url;
      document.description = req.body.description;

      Document.updateOne({id: req.params.id}, document)
        .then(result => {
          res.status(200).json({
            message: 'Document updated successfully',
            obj: result
          });
        })
        .catch(err => {
          res.status(500).json({
            title: 'An error occurred',
            error: err
          });
        });
    })
    .catch(err => {
      res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    });
});

router.delete('/:id', (req, res, next) => {
  Document.findOne({id: req.params.id})
    .then(document => {
      Document.deleteOne({id: req.params.id})
        .then(result => {
          res.status(200).json({
            message: 'Document deleted successfully',
            obj: result
          });
        })
        .catch(err => {
          res.status(500).json({
            title: 'An error occurred',
            error: err
          });
        });
    })
    .catch(err => {
      res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    });
});


module.exports = router;


