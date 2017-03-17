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

router.get '/list/:location/:zone/:category/:offset', (req, res, next) ->
  pageLimit = 20
  zone = req.params.zone
  category = req.params.category
  locationId = Number(req.params.location)
  offset = req.params.offset
  MongoClient.connect url, (err, db) ->

    location = db.collection 'location'
    #    해당하는 location이 속한 지역을 알아낸다
    zoneCondition = if zone == 'all' then {} else {'zone': zone}
    categoryCondition = if category == 'all' then {} else {"category": {$in:[category]}}
    condition = { $and: [zoneCondition, categoryCondition]}
    assert.equal null, err
    franchise = db.collection 'franchise'
    franchise.find(condition).count (err, count) ->
#더 불러올 페이지가 있는지 확인
      more = if (Number(offset) + 1) * Number(pageLimit) < Number(count) then 1 else 0
      franchise.find(condition).sort({id:-1}).skip(pageLimit * offset).limit(pageLimit).toArray (err, docs) ->
        res.send {data: {more: more, franchise: docs}}
    db.close

module.exports = router
