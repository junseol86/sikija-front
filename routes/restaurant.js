// Generated by CoffeeScript 1.11.1
(function() {
  var MongoClient, assert, authMechanism, authSource, cheerio, express, f, password, request, router, secretValues, url, user;

  express = require('express');

  request = require('request');

  cheerio = require('cheerio');

  router = express.Router();

  MongoClient = require('mongodb').MongoClient;

  f = require('util').format;

  assert = require('assert');

  secretValues = require('./secretValues');

  user = encodeURIComponent(secretValues.secretValues.username);

  password = encodeURIComponent(secretValues.secretValues.password);

  authMechanism = 'DEFAULT';

  authSource = 'sikija';

  url = f('mongodb://%s:%s@133.130.103.96:27017/sikija?authMechanism=%s&authSource=%s', user, password, authMechanism, authSource);

  router.get('/list/:location/:dong/:category/:offset', function(req, res, next) {
    var category, dong, locationId, offset, pageLimit;
    pageLimit = 20;
    dong = req.params.dong;
    category = req.params.category;
    locationId = Number(req.params.location);
    offset = req.params.offset;
    return MongoClient.connect(url, function(err, db) {
      var location;
      location = db.collection('location');
      location.findOne({
        id: locationId
      }, function(err, docs) {
        var categoryCondition, condition, dongCondition, region, restaurant;
        region = docs.region;
        dongCondition = dong === 'all' ? {} : {
          'dong': dong
        };
        categoryCondition = category === 'all' ? {} : {
          "category": {
            $in: [category]
          }
        };
        condition = {
          $and: [
            {
              'region': region
            }, dongCondition, categoryCondition
          ]
        };
        assert.equal(null, err);
        restaurant = db.collection('restaurant');
        return restaurant.find(condition).count(function(err, count) {
          var more;
          more = (Number(offset) + 1) * Number(pageLimit) < Number(count) ? 1 : 0;
          return restaurant.find(condition).sort({
            id: -1
          }).skip(pageLimit * offset).limit(pageLimit).toArray(function(err, docs) {
            return res.send({
              data: {
                more: more,
                restaurant: docs
              }
            });
          });
        });
      });
      return db.close;
    });
  });

  router.get('/view/:restaurant', function(req, res, next) {
    var restaurantId;
    restaurantId = Number(req.params.restaurant);
    return MongoClient.connect(url, function(err, db) {
      var restaurant;
      restaurant = db.collection('restaurant');
      return restaurant.findOne({
        id: restaurantId
      }, function(err, docs) {
        var fn, i, len, link, linkObjs, links, linksCount, results;
        links = docs.links;
        linksCount = links.length;
        linkObjs = [];
        fn = function(link) {
          return request(link, function(err, response, body) {
            var $, obj, title;
            $ = cheerio.load(body);
            title = $('title').text();
            obj = {
              'link': link,
              'title': title
            };
            linkObjs.push(obj);
            if (linkObjs.length === linksCount) {
              docs['link_n_title'] = linkObjs;
              return res.send({
                data: docs
              });
            }
          });
        };
        results = [];
        for (i = 0, len = links.length; i < len; i++) {
          link = links[i];
          fn(link);
          results.push(db.close);
        }
        return results;
      });
    });
  });

  module.exports = router;

}).call(this);

//# sourceMappingURL=restaurant.js.map
