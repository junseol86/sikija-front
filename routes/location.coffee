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

router.get '/list', (req, res, next) ->
  condition = {}
  MongoClient.connect url, (err, db) ->
    assert.equal null, err
    delivery = db.collection 'location'
    delivery.find(condition).toArray (err, docs) ->
      res.send {data: docs}
    db.close

router.get '/view/:id', (req, res, next) ->
  condition = {'id': Number(req.params.id)}
  MongoClient.connect url, (err, db) ->
    assert.equal null, err
    delivery = db.collection 'location'
    delivery.findOne condition, (err, docs) ->
      res.send {data: docs}
    db.close

router.get '/from_wicam', (req, res, next) ->
  res.send """
      <!DOCTYPE html>
      <html>
        <head>
          <title>위캠</title>
          <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width">
          <style>
            body {
              padding: 24px;
              }
            button {
              width: 100%;
              background-color: tomato;
              color:white;
              font-size: 1.5em;
              padding: 40px; 0px;
              border: 0;
              outline: 0;
              border-radius: 24px;
              margin-bottom: 12px;
              }
          </style>
        </head>
        <body>
          <div>
            <button onclick="window.open('http://시키자.com', '_blank');">시키자.com으로 이동</button><br>
            <span>위캠에서 동작하지 않을 시 인터넷 앱에서 한글주소 [시키자.com]으로 접속하세요.</span>
          </div>
        </body>
        <script>
          window.open('http://시키자.com', '_blank');
        </script>
      </html>
      """


module.exports = router
