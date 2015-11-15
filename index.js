var twit = require('twit');
var twitter = new twit({
  consumer_key:         '---------'
, consumer_secret:      '--------'
, access_token:         '-----------'
, access_token_secret:  '------------'
});
// bot's hand
var self = '-------';

var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.send("Hello");
});

// listen to user event stream
var stream = twitter.stream('user');

// on follow, reply
stream.on('follow', function (eventMsg) {
  console.log(eventMsg);
  twitter.post('statuses/update', { status: '@' +eventMsg.source.screen_name + ' Hello, World!' }, function(err, data, response) {
    console.log(data)
  })
});

stream.on('tweet', function (eventMsg) {
  console.log(eventMsg);
  if(!eventMsg.source.screen_name != self){
    console.log(eventMsg.source.screen_name != self);
      twitter.post('statuses/update', { status: '@' +eventMsg.source.screen_name + ' Hello, World!' }, function(err, data, response) {
      console.log(data)
    });

  }
});

app.listen(app.get('port'), function() {
  console.log('App is running', app.get('port'));
});
