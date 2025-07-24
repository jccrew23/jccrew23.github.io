var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');

router.get('/', (req, res, next) => {
  Message.find()
    .then(messages => {
      res.status(200).json({
        message: 'Success',
        obj: messages
      });
    })
    .catch(err => {
      res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    });
});

router.post('/', (req, res, next) => {
  const maxMessageId = sequenceGenerator.nextId('messages');
  const message = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender,
  });
  message.save()
    .then(result => {
      res.status(201).json({
        message: 'Message created successfully',
        obj: result
      });
    })
    .catch(err => {
      res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    });
});

router.put('/:id', (req, res, next) => {
  Message.findOne({id: req.params.id})
    .then(message => {
      message.subject = req.body.subject;
      message.msgText = req.body.msgText;
      message.sender = req.body.sender;

      Message.updateOne({id: req.params.id}, message)
        .then(result => {
          res.status(200).json({
            message: 'Message updated successfully',
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
  Message.findOne({id: req.params.id})
    .then(message => {
      Message.deleteOne({id: req.params.id})
        .then(result => {
          res.status(200).json({
            message: 'Message deleted successfully',
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

