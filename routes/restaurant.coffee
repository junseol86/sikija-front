express = require 'express'
request = require 'request'
cheerio = require 'cheerio'
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


router.get '/list/:location/:dong/:category/:offset', (req, res, next) ->
  pageLimit = 20
  dong = req.params.dong
  category = req.params.category
  locationId = Number(req.params.location)
  offset = req.params.offset
  MongoClient.connect url, (err, db) ->

    location = db.collection 'location'
    #    해당하는 location이 속한 지역을 알아낸다
    location.findOne {id: locationId}, (err, docs) ->
      region = docs.region
      dongCondition = if dong == 'all' then {} else {'dong': dong}
      categoryCondition = if category == 'all' then {} else {"category": {$in:[category]}}
      condition = { $and: [{'region': region}, dongCondition, categoryCondition]}
      assert.equal null, err
      restaurant = db.collection 'restaurant'
      restaurant.find(condition).count (err, count) ->
      #더 불러올 페이지가 있는지 확인
        more = if (Number(offset) + 1) * Number(pageLimit) < Number(count) then 1 else 0
        restaurant.find(condition).sort({id:-1}).skip(pageLimit * offset).limit(pageLimit).toArray (err, docs) ->
          res.send {data: {more: more, restaurant: docs}}
    db.close


router.get '/view/:restaurant', (req, res, next) ->
  restaurantId = Number(req.params.restaurant)

  MongoClient.connect url, (err, db) ->
    restaurant = db.collection 'restaurant'
    restaurant.findOne {id: restaurantId}, (err, docs) ->
      links = docs.links
      linksCount = links.length
      linkObjs = []

      for link in links
        do (link) ->
          request link, (err, response, body) ->
            $ = cheerio.load(body)
            title =  $('title').text()
            obj = {'link': link, 'title': title}
            linkObjs.push obj
            if linkObjs.length == linksCount
              docs['link_n_title']=linkObjs
              res.send {data: docs}
        db.close

module.exports = router
