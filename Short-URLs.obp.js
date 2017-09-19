const google = require('googleapis'); // will need later for goo.gl
const util = require('util');
const trun = require('truncate');

const shorteners = {
  'goo.gl': [
    'goo.gl',
    'google',
    'googl',
    'goog.gl', // yes, i sometimes type it like this
  ],
  'bit.ly': [
    'bit.ly',
    'bitly',
  ],
  'ow.ly': [
    'ow.ly',
    'owly',
    'owl',
    'owie', // oof, ouch
  ]
};

function googleShorten(longUrl, bot, event) {

}
function bitShorten(longUrl, bot, event) {

}
function owlShorten(longUrl, bot, event) {

}

exports.onMessageReceived = (function ShortURLs(bot, doc, user, userID, channelID, message, event) {
  require('./../exports.js').registerCmd(['shorten <longUrl> <shortener>'], 'Converts a long URL into a short URL using a specified or random URL shortener.');

  if (message === undefined) {
    return;
  }

  if (message.startsWith(doc.prefix + "shorten ")) {
    bot.simulateTyping(channelID);

    var arguments = message.replace(doc.prefix + "shorten ", "").split(' ');

    if (arguments.length > 2) {
      bot.sendMessage({
        to: channelID,
        message: ':x: Please encode spaces in your long URL (`%20`) and make sure you didn\'t use two words for your URL shortener type.'
      })
    } else if (shorteners['goo.gl'].indexOf(arguments[1]) > -1) {
      // do goo.gl api call here
      googleShorten(arguments[0], bot, event);
    } else if (shorteners['bit.ly'].indexOf(arguments[1]) > -1) {
      // do bit.ly api call here
      bitShorten(arguments[0], bot, event);
    } else if (shorteners['ow.ly'].indexOf(arguments[1]) > -1) {
      // do ow.ly api call here
      owlShorten(arguments[0], bot, event);
    } else if (arguments[1] == undefined) {
      // random shortener
    } else {
      bot.sendMessage({
        to: channelID,
        message: `:x: There is no shortener by the name of \`${arguments[1]}\`!`
      });
    }
  }
});
