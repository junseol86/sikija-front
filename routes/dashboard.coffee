express = require 'express'
request = require 'request'
router = express.Router();

router.get '/jobs', (req, res, next) ->
  link = 'http://job.ddhouse.co.kr/api/job/new?area=&theme='
  request {method:'GET', uri:link, encoding:null}, (err, response, body) ->
    res.send body.toString().trim()
module.exports = router
