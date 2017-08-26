'use strict';

var feed = require('feed-read');
var _ = require('lodash');

// TODO: take this from config
var URL = 'https://www.promodescuentos.com/rss/todas';
var UPDATE_TIME = 60000;

var lastArticleLinks = [];

var halfArray = function halfArray(array) {
  var middle = array.length - array.length / 2;
  middle = Math.floor(middle);
  return array.slice(middle, array.length - 1);
};

var feedReader = {
  read: function read(onUpdate) {
    setInterval(function () {
      feed(URL, function (err, response) {
        if (err) console.log(err);
        if (_.isEmpty(response)) return null;

        var articles = _.reverse(response);
        var articleLinks = articles.map(function (article) {
          return article.link;
        });
        var newArticleLinks = _.difference(articleLinks, lastArticleLinks);
        lastArticleLinks = _.concat(lastArticleLinks, newArticleLinks);

        // keep only last 100 articles to compare
        if (lastArticleLinks.length >= 100) {
          lastArticleLinks = halfArray(lastArticleLinks);
        }
        // filter articles to return
        var newArticles = articles.filter(function (article) {
          return newArticleLinks.indexOf(article.link) !== -1;
        });

        console.log('new article links:', newArticleLinks);
        onUpdate(newArticles);
      });
    }, UPDATE_TIME);
  }
};

module.exports = feedReader;