// Generated by CoffeeScript 1.11.1
(function() {
  var MongoClient, assert, authMechanism, authSource, express, f, password, router, secretValues, url, user;

  express = require('express');

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

  router.get('/list/:locationId/:category', function(req, res, next) {
    var category, categoryCondition, condition, location;
    category = req.params.category;
    location = Number(req.params.locationId);
    categoryCondition = category === 'all' ? {} : {
      "category": {
        $in: [category]
      }
    };
    condition = {
      $and: [
        {
          "locations": {
            "$in": [location]
          }
        }, categoryCondition
      ]
    };
    console.log(condition);
    return MongoClient.connect(url, function(err, db) {
      var delivery;
      assert.equal(null, err);
      delivery = db.collection('delivery');
      delivery.find(condition).toArray(function(err, docs) {
        return res.send({
          data: docs
        });
      });
      return db.close;
    });
  });

  router.get('/list/:locationId/:category/:offset', function(req, res, next) {
    var category, categoryCondition, condition, location, offset, pageLimit;
    pageLimit = 20;
    category = req.params.category;
    location = Number(req.params.locationId);
    offset = req.params.offset;
    categoryCondition = category === 'all' ? {} : {
      "category": {
        $in: [category]
      }
    };
    condition = {
      $and: [
        {
          "locations": {
            "$in": [location]
          }
        }, categoryCondition
      ]
    };
    return MongoClient.connect(url, function(err, db) {
      var delivery;
      assert.equal(null, err);
      delivery = db.collection('delivery');
      delivery.find(condition).count(function(err, count) {
        var more;
        more = (Number(offset) + 1) * Number(pageLimit) < Number(count) ? 1 : 0;
        return delivery.find(condition).skip(pageLimit * offset).limit(pageLimit).toArray(function(err, docs) {
          return res.send({
            data: {
              more: more,
              delivery: docs
            }
          });
        });
      });
      return db.close;
    });
  });

  router.get('/view/:id', function(req, res, next) {
    var condition;
    condition = {
      'id': Number(req.params.id)
    };
    return MongoClient.connect(url, function(err, db) {
      var delivery;
      assert.equal(null, err);
      delivery = db.collection('delivery');
      delivery.findOne(condition, function(err, docs) {
        return res.send({
          data: docs
        });
      });
      return db.close;
    });
  });

  module.exports = router;

}).call(this);

//# sourceMappingURL=delivery.js.map
