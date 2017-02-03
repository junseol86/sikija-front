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

url = f('mongodb://%s:%s@133.130.103.96:27017/sikija?authMechanism=%s&authSource=%s', user, password, authMechanism, authSource);

router.get '/list/:locationId/:category', (req, res, next) ->
  category = req.params.category
  location = Number(req.params.locationId)
  categoryCondition = if category == 'all' then {} else {"category": {$in:[category]}}
  condition = { $and: [{"locations": {"$in": [location]}}, categoryCondition]}
  console.log(condition)
  MongoClient.connect url, (err, db) ->
    assert.equal null, err
    delivery = db.collection 'delivery'
    delivery.find(condition).toArray (err, docs) ->
      res.send {data: docs}
    db.close

router.get '/view/:id', (req, res, next) ->
  condition = {'id': Number(req.params.id)}
  MongoClient.connect url, (err, db) ->
    assert.equal null, err
    delivery = db.collection 'delivery'
    delivery.findOne condition, (err, docs) ->
      res.send {data: docs}
    db.close

module.exports = router