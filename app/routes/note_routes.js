const collectionName = 'notes';

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db){
  app.get('/notes/all/:id', (req, res) => {
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
  app.get('/notes/:id', (req, res) => {
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
  app.post('/notes', (req, res) => {
    const note = { 
      title: req.body.title, 
      content: req.body.content, 
      userId: req.body.userId 
    };
    db.collection(collectionName).insert(note, (err, result) => {
      if (err){
        res.send({ 'error:': 'An error has occurred' })
      } else {
        res.send(result.ops[0])
      }
    });
  });
  app.put('/notes/:id', (req ,res) => {
    const id = req.params.id;
    const details = {  '_id': new ObjectID(id) };
    const note = { title: req.body.title, content: req.body.content, userId: req.body.userId };
    db.collection(collectionName).update(details, note, (err, result) => {
      if (err){
        res.send({'error':'An error has occured'});
      } else {
        res.send(note);
      }
    });
  });
  app.delete('/notes/:id', (req, res) => {
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