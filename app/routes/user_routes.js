const collectionName = 'users';

module.exports = function(app, db){
  app.post('/login', (req, res) => {
    db.collection(collectionName).find({}, { tokenId: req.body.tokenId })
      .toArray(function (err, result){
      if (err){
        res.send({'error': 'An error has occured'});
      } else {
        res.send(JSON.stringify(result));
      }
    });
  });
  app.post('/user', (req, res) => {
    const user = { tokenId: req.body.tokenId };
    db.collection(collectionName).insert(user, (err, result) => {
      if (err){
        res.send({ 'error':'An error has occurred' })
      } else {
        res.send(result.ops[0]);
      }
    });
  });
  app.get('/users', (req, res) =>{
    db.collection(collectionName).find({}).toArray(function (err, result){
      if (err){
        res.send({"error": "An error has occurred"})
      } else {
        res.send(JSON.stringify(result));
      }
    });
  });
}