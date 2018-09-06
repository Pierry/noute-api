const collectionName = 'notes';
const prefix = '/v1';

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db){
  app.get(prefix + '/notes/all/:id', (req, res) => {
    var query = { 'userId':req.params.id };
    var projection = { "userId": 0 };
    db.collection(collectionName).find(query)
    .project(projection)
    .toArray(function (err, result) {
      if (err){
        res.send(err);
      } else {
        res.send(JSON.stringify(result));
      }
    });
  });
  app.get(prefix + '/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection(collectionName).findOne(details, (err, item) => {
      if (err){
        res.send({'error': 'An error has occurred'});
      } else {
        res.send(item);
      }
    })
  });
  app.post(prefix + '/notes', (req, res) => {
    const note = { 
      title: req.body.title, 
      content: req.body.content, 
      userId: req.body.userId,
      updatedAt: req.body.updatedAt
    };
    db.collection(collectionName).insert(note, (err, result) => {
      if (err){
        res.send({ 'error:': 'An error has occurred' })
      } else {
        res.send(result.ops[0])
      }
    });
  });
  app.put(prefix + '/notes/:id', (req ,res) => {
    const id = req.params.id;
    const details = {  '_id': new ObjectID(id) };
    const note = { 
      title: req.body.title, 
      content: req.body.content, 
      userId: req.body.userId,
      updatedAt: req.body.updatedAt
    };
    db.collection(collectionName).update(details, note, (err, result) => {
      if (err){
        res.send({'error':'An error has occured'});
      } else {
        res.send(note);
      }
    });
  });
  app.delete(prefix + '/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) }
    db.collection(collectionName).remove(details, (err, item) => {
      if (err){
        res.send({'error':'An error has occurred'})
      } else {
        res.send('Note ' + id + ' deleted');
      }
    });
  });
};