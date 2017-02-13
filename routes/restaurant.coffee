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


router.get '/list/:region/:dongs/:category/:offset', (req, res, next) ->
  pageLimit = 20
  category = req.params.category
  region = req.params.region
  offset = req.params.offset
  categoryCondition = if category == 'all' then {} else {"category": {$in:[category]}}
  condition = { $and: [{'region': region}, categoryCondition]}
  MongoClient.connect url, (err, db) ->
    assert.equal null, err
    restaurant = db.collection 'restaurant'
    restaurant.find(condition).count (err, count) ->
#더 불러올 페이지가 있는지 확인
      more = if (Number(offset) + 1) * Number(pageLimit) < Number(count) then 1 else 0
      restaurant.find(condition).skip(pageLimit * offset).limit(pageLimit).toArray (err, docs) ->
        res.send {data: {more: more, restaurant: docs}}
    db.close


module.exports = router
