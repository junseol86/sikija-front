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

  router.get('/list/:category', function(req, res, next) {
    var category, condition;
    category = req.params.category;
    condition = category === 'all' ? {} : {
      "category": {
        $in: [category]
      }
    };
    console.log(category);
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
