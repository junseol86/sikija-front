express = require 'express'
router = express.Router();

MongoClient = require('mongodb').MongoClient
f = require('util').format
assert = require 'assert'
secretValues = require('./secretValues')

user = encodeURIComponent(secretValues.secretValues.username)
password = encodeURIComponent(secretValues.secretValues.password)
authMechanism = 'DEFAULT'
authSource = 'sikija'

#url = f('mongodb://133.130.103.96:27017/sikija')
url = f('mongodb://%s:%s@133.130.103.96:27017/sikija?authMechanism=%s&authSource=%s', user, password, authMechanism, authSource);

router.get '/list/:category', (req, res, next) ->
  category = req.params.category
  condition = if category == 'all' then {} else {"category": {$in:[category]}}
  console.log(category)
  MongoClient.connect url, (err, db) ->
    assert.equal null, err
    delivery = db.collection 'delivery'
    delivery.find(condition).toArray (err, docs) ->
      res.send docs
    db.close

module.exports = router