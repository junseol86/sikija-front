express = require 'express'
request = require 'request'
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

router.get '/jobs', (req, res, next) ->
  link = 'http://job.ddhouse.co.kr/api/job/new?area=&theme='
  request {method:'GET', uri:link, encoding:null}, (err, response, body) ->
    res.send body.toString().trim()
module.exports = router

router.get '/restaurants', (req, res, next) ->
  condition = {}
  MongoClient.connect url, (err, db) ->
    assert.equal null, err
    restaurant = db.collection 'dashboard'
    restaurant.find(condition).toArray (err, docs) ->
      res.send docs[0]['restaurants']
    db.close

router.get '/new_restaurants', (req, res, next) ->
  condition = {}
  MongoClient.connect url, (err, db) ->
    assert.equal null, err
    restaurant = db.collection 'restaurant'
    restaurant.find(condition).sort({id:-1}).limit(2).toArray (err, docs) ->
      res.send {data: docs}
    db.close
