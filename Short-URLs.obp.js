const google = require("googleapis"); // will need later for goo.gl
const util = require("util");
const trun = require("truncate");
const request = require("request");

function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const shorteners = {
  "goo.gl": [
    "goo.gl",
    "google",
    "googl",
    "goog.gl", // yes, i sometimes type it like this
  ],
  "bit.ly": [
    "bit.ly",
    "bitly",
  ]
};

function googleShorten(longUrl, bot, event, doc) {
  var options = { method: "POST",
    url: "https://www.googleapis.com/urlshortener/v1/url",
    qs: { key: doc.googleShortenKey },
    headers: { "content-type": "application/json" },
    body: { longUrl: longUrl },
    json: true };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    bot.sendMessage({
      to: event.d.channel_id,
      embed: {
        title: "Shortened URL",
        color: 0x77b255,
        timestamp: new Date(),
        description: ":white_check_mark: The URL was sucessfully shortened.",
        fields: [
          {
            name: "Short URL",
            value: body.id
          },
          {
            name: "Long URL",
            value: body.longUrl
          }
        ]
      }
    });
});
}
function bitShorten(longUrl, bot, event, doc) {
  var options = { method: "GET",
  url: "https://api-ssl.bitly.com/v3/shorten",
  qs:
   { access_token: doc.bitlyShortenKey,
     longUrl: longUrl },
  headers:
   { "cache-control": "no-cache" }
 };

request(options, function (error, response, body) {
  var data = JSON.parse(body).data
  if (error) throw new Error(error);
      bot.sendMessage({
        to: event.d.channel_id,
        embed: {
          title: "Shortened URL",
          color: 0x77b255,
          timestamp: new Date(),
          description: ":white_check_mark: The URL was sucessfully shortened.",
          fields: [
            {
              name: "Short URL",
              value: data.url
            },
            {
              name: "Long URL",
              value: data.long_url
            }
          ]
        }
      });

});
}

exports.onMessageReceived = (function ShortURLs(bot, doc, user, userID, channelID, message, event) {
  require("./../exports.js").registerCmd(["shorten <longUrl> <shortener>"], "Converts a long URL into a short URL using a specified or random URL shortener.");

  if (message === undefined) {
    return;
  }

  if (message.startsWith(doc.prefix + "shorten ")) {
    bot.simulateTyping(channelID);

    var arguments = message.replace(doc.prefix + "shorten ", "").split(" ");

    if (arguments.length > 2) {
      bot.sendMessage({
        to: event.d.channel_id,
        embed: {
          title: "Error",
          color: 0xdd2e44,
          timestamp: new Date(),
          description: ":x: Please encode spaces in your long URL (`%20`) and make sure you didn't use two words for your URL shortener type."
        }
      });
    } else if (shorteners["goo.gl"].indexOf(arguments[1]) > -1) {
      // do goo.gl api call here
      googleShorten(arguments[0], bot, event, doc);
    } else if (shorteners["bit.ly"].indexOf(arguments[1]) > -1) {
      // do bit.ly api call here
      bitShorten(arguments[0], bot, event, doc);
    } else if (arguments[1] == undefined) {
      // random shortener
      var shortenerId = randInt(0, 1);

      if (shortenerId === 0) {
        // do goo.gl api call here
        googleShorten(arguments[0], bot, event, doc);
      } else if (shortenerId === 1) {
        // do bit.ly api call here
        bitShorten(arguments[0], bot, event, doc);
      }
    } else {
      bot.sendMessage({
        to: event.d.channel_id,
        embed: {
          title: "Error",
          color: 0xdd2e44,
          timestamp: new Date(),
          description: `:x: There is no shortener by the name of \`${arguments[1]}\`!`
        }
      });
    }
  }
});
