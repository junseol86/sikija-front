// Generated by CoffeeScript 1.11.1
(function() {
  var express, request, router;

  express = require('express');

  request = require('request');

  router = express.Router();

  router.get('/jobs', function(req, res, next) {
    var link;
    link = 'http://job.ddhouse.co.kr/api/job/new?area=&theme=';
    return request({
      method: 'GET',
      uri: link,
      encoding: null
    }, function(err, response, body) {
      return res.send(body.toString().trim());
    });
  });

  module.exports = router;

}).call(this);

//# sourceMappingURL=dashboard.js.map
