const collectionName = 'users';
const prefix = '/v1';

module.exports = function(app, db){
  app.post(prefix + '/login', (req, res) => {
    var query = { "tokenId": req.body.tokenId };
    db.collection(collectionName).find(query)
      .toArray(function (err, result){
      if (err){
        res.send({'error': 'An error has occured'});
      } else {
        res.send(JSON.stringify(result));
      }
    });
  });
  app.post(prefix + '/user', (req, res) => {
    const user = { tokenId: req.body.tokenId };
    db.collection(collectionName).insert(user, (err, result) => {
      if (err){
        res.send({ 'error':'An error has occurred' })
      } else {
        res.send(result.ops[0]);
      }
    });
  });
  app.get(prefix + '/users', (req, res) =>{
    db.collection(collectionName).find({}).toArray(function (err, result){
      if (err){
        res.send({"error": "An error has occurred"})
      } else {
        res.send(JSON.stringify(result));
      }
    });
  });
}