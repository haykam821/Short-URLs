Welcome to the *most official* Onebot plugin for creating (and soon expanding) short URLs.

## Configuration

To let Onebot load this plugin, simply drag-and-drop `Short-URLs.obp.js` into your Onebot installation's plugin folder. Onebot automatically tries to create one if it doesn't exist when you start it up, but if that doesn't happen, create `./plugins`.

There are two API keys you will need to enter (`googleShortenKey` and `bitlyShortenKey`). In a future update they'll be disableable by leaving the API keys blank.

## Shortening

The command format is pretty simple:

    *shorten <longUrl> <shortener>
    
The `longUrl` parameter works as you think it would. Paste almost any URL that you can open in your browser and all shorteners should play nice with it.

The `shortener` parameter is less required and chooses which domain the shortened URL will use if given, or pick a random one if left out. You can shorten into these domains:

* `goo.gl`
* `bit.ly` (not really but soon™)

You can also write close matches such as `google` or `bitly`, and Onebot will still accept it.

## Expanding

The plugin this README is bundled with does not have support for expanding short URLs, but it will come very soon. Keep watching the GitHub repository!
